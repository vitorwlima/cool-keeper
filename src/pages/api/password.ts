import Cryptr from 'cryptr'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getCsrfToken } from 'next-auth/react'
import { prisma } from 'src/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getCsrfToken(req as any)

  if (req.method === 'POST') {
    const cryptr = new Cryptr(process.env.PASSWORD_HASH!)
    const { name, login, password, userId } = req.body
    const encrypted_password = cryptr.encrypt(password)
    const newPassword = await prisma.password.create({
      data: {
        encrypted_password,
        name,
        login,
        userId
      }
    })
    return res.status(201).json({ success: true })
  }

  return res.status(404).end()
}