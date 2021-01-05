import { NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken'
import { connectToDatabase } from '../../../utils/mongodb'
import { secret } from '../../../utils/secret'
import { authenticated } from '../authenticated'

interface TokenPayload {
  iat: number
  exp: number
  userId: string
}

export default authenticated(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const token = verify(req.cookies.auth, secret)
    const { userId } = token as TokenPayload

    try {
      const { method } = req
      const { db } = await connectToDatabase()
      const appointment = db.collection('appointments')

      if (method === 'POST') {
        const {
          date,
          period,
          color
        }: { date: Date; period: string; color: string } = req.body

        await appointment.insertOne({
          date,
          period,
          userId,
          color
        })

        return res.status(200).json({ ok: true })
      }
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
)
