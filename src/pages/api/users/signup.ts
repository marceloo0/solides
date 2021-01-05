import { NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcryptjs'

import { connectToDatabase } from '../../../utils/mongodb'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { method } = req

    const { db } = await connectToDatabase()
    const user = db.collection('users')

    switch (method) {
      case 'GET':
        try {
          const { email }: { email: string } = req.body
          const userEmail = await user.findOne({ email })
          res.status(200).json({ success: true, data: userEmail })
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break

      case 'POST':
        try {
          const {
            name,
            email,
            password
          }: { name: string; email: string; password: string } = req.body

          if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing body parameter' })
          }

          const hashPassword = await hash(password, 8)
          const checkUser = await user.findOne({ email })
          if (checkUser) {
            return res
              .status(400)
              .json({ error: 'Email already registered, try another.' })
          }

          await user.insertOne({
            name,
            email,
            password: hashPassword
          })

          return res.status(200).json({ ok: true })
        } catch (err) {
          res.status(400).json({ message: err.message })
        }
        break

      default:
        res.status(400).json({ err: 'We only support POST' })
        break
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
