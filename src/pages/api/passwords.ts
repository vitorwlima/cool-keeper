import Cryptr from 'cryptr'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'src/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const cryptr = new Cryptr(process.env.PASSWORD_HASH!)
    const encryptedPasswords = await prisma.password.findMany()
    const passwords = encryptedPasswords.map(pass => ({
      ...pass,
      decrypted_password: cryptr.decrypt(pass.encrypted_password)
    }))
    res.status(200).json({ success: true, passwords })
  }

  return res.status(404).end()
}