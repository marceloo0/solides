import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req

    if (method === 'POST') {
      const cookies = cookie.parse(req.headers.cookie ?? '')
      const userSecret = cookies['auth']

      if (!userSecret) {
        return res.status(200).end()
      }

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('auth', '', {
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'development',
          // secure: process.env.NODE_ENV === 'production',
          maxAge: -1,
          httpOnly: true,
          path: '/'
        })
      )
      res.status(200).end()
    }
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
