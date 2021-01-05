import { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import cookie from 'cookie'

import { connectToDatabase } from '../../../utils/mongodb'
import { secret } from '../../../utils/secret'

interface ErrorResponseType {
  error: string
}

interface User {
  _id: string
  name: string
  email: string
  password: string
}

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | User>
) {
  try {
    const { method } = req

    if (method === 'POST') {
      const { db } = await connectToDatabase()
      const user = db.collection('users')

      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ error: 'Missing body parameter' })
      }

      const checkUser = await user.findOne({ email })

      if (!checkUser) {
        return res.status(400).json({ error: 'User not found' })
      }

      compare(password, checkUser?.password as string, function (err, result) {
        if (!err && result) {
          const claims = { userId: checkUser?._id }
          const jwt = sign(claims, secret, { expiresIn: '1h' })
          res.setHeader(
            'Set-Cookie',
            cookie.serialize('auth', jwt, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== 'development',
              sameSite: 'strict',
              maxAge: 3600,
              path: '/'
            })
          )
          res.status(200).json(checkUser)
        } else {
          res.status(400).json({ error: 'Ups, something went wrong!' })
        }
      })
    } else {
      return res.status(400).json({ error: 'We only support POST' })
    }
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
