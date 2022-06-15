import Cryptr from "cryptr"
import { prisma } from "../prisma"

export const getPasswords = async () => {
  const cryptr = new Cryptr(process.env.PASSWORD_HASH!)
  const encryptedPasswords = await prisma.password.findMany()
  const passwords = encryptedPasswords.map(pass => ({
    ...pass,
    decrypted_password: cryptr.decrypt(pass.encrypted_password)
  }))

  return passwords
}