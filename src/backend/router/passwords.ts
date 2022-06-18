import Cryptr from 'cryptr'
import { z } from 'zod'
import { prisma } from '../db/prisma'
import { createRouter } from './context'

export const passwordsRouter = createRouter()
  .query('get', {
    input: z.object({
      userId: z.string()
    }),
    resolve: async ({ input }) => {
      const cryptr = new Cryptr(process.env.PASSWORD_HASH!)
      const encryptedPasswords = await prisma.password.findMany({
        where: {
          userId: input.userId
        }
      })
      const passwords = encryptedPasswords.map(pass => ({
        ...pass,
        decrypted_password: cryptr.decrypt(pass.encrypted_password)
      }))

      return passwords
    }
  }).mutation('create', {
    input: z.object({
      name: z.string(),
      login: z.string(),
      password: z.string(),
      userId: z.string()
    }),
    resolve: async ({ input }) => {
      const cryptr = new Cryptr(process.env.PASSWORD_HASH!)
      const { name, login, password, userId } = input
      const encryptedPassword = cryptr.encrypt(password)
      await prisma.password.create({
        data: {
          encrypted_password: encryptedPassword,
          name,
          login,
          userId
        }
      })
    }
  })
