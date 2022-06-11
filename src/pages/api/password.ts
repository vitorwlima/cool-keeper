import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'src/lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, password } = req.body;
    const newPassword = await prisma.password.create({ data: {
      encrypted_password: password,
      name
    }})
    res.status(201).json({ success: true, data: newPassword })
  }

  return res.status(404).end()
}