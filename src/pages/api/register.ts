import bcrypt from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'src/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, login, password } = req.body
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    await prisma.user.create({
      data: {
        name,
        login,
        passwordHash
      }
    })
    res.status(201).json({ success: true })
  }

  return res.status(404).end()
}