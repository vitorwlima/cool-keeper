import Cryptr from 'cryptr'
import { prisma } from 'src/lib/prisma'
import { z } from 'zod'
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
  })
