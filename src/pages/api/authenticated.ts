import { NextApiRequest, NextApiHandler, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken'

import { secret } from '../../utils/secret'

export const authenticated = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  verify(req.cookies.auth, secret, async function (err, decoded) {
    if (!err && decoded) {
      return await fn(req, res)
    }

    res.status(401).json({ message: 'Sorry you are not authenticated' })
  })
}
