import { NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken'

import { connectToDatabase } from '../../../utils/mongodb'
import { secret } from '../../../utils/secret'
import { authenticated } from '../authenticated'

interface ErrorResponseType {
  error: string
}

interface TokenPayload {
  iat: number
  exp: number
  userId: string
}

export default authenticated(
  async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseType | Record<string, unknown>[]>
  ): Promise<void> => {
    const token = verify(req.cookies.auth, secret)
    const { userId } = token as TokenPayload

    try {
      const { method } = req
      const { db } = await connectToDatabase()
      const appointment = db.collection('appointments')

      if (method === 'GET') {
        const response = await appointment.find({ userId }).toArray()

        return res.status(200).json(response)
      } else {
        return res.status(400).json({ error: 'Wrong request method' })
      }
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
)
