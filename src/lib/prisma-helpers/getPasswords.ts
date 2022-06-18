import Cryptr from 'cryptr'
import { prisma } from '../prisma'

export const getPasswords = async (userId: string) => {
  const cryptr = new Cryptr(process.env.PASSWORD_HASH!)
  const encryptedPasswords = await prisma.password.findMany({
    where: {
      userId
    }
  })
  const passwords = encryptedPasswords.map(pass => ({
    ...pass,
    decrypted_password: cryptr.decrypt(pass.encrypted_password)
  }))

  return passwords
}
