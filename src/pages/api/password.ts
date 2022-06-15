import Cryptr from 'cryptr'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'src/lib/prisma'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const cryptr = new Cryptr(process.env.PASSWORD_HASH!)
    const { name, login, password } = req.body
    const encrypted_password = cryptr.encrypt(password)
    const newPassword = await prisma.password.create({
      data: {
        encrypted_password,
        name,
        login
      }
    })
    res.status(201).json({ success: true, data: newPassword })
  }

  return res.status(404).end()
}