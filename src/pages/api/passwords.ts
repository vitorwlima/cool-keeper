import type { NextApiRequest, NextApiResponse } from 'next'
import { getPasswords } from 'src/lib/prisma-helpers/getPasswords'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const passwords = await getPasswords()
    res.status(200).json({ success: true, passwords })
  }

  return res.status(404).end()
}