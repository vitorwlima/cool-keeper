import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'src/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const passwords = await prisma.password.findMany()
    res.status(200).json({ success: true, passwords })
  }

  return res.status(404).end()
}