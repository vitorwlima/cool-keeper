import Cryptr from 'cryptr'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'src/lib/prisma'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const cryptr = new Cryptr(process.env.PASSWORD_HASH!)
    const { name, login, password, userId } = req.body
    const encryptedPassword = cryptr.encrypt(password)
    await prisma.password.create({
      data: {
        encrypted_password: encryptedPassword,
        name,
        login,
        userId
      }
    })
    return res.status(201).json({ success: true })
  }

  return res.status(404).end()
}
