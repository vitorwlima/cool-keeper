import Cryptr from 'cryptr'
import { z } from 'zod'
import { prisma } from '../db/prisma'
import { createRouter } from './context'

export const passwordsRouter = createRouter()
  .query('get', {
    input: z.object({
      userId: z.string(),
    }),
    resolve: async ({ input }) => {
      const cryptr = new Cryptr(process.env.PASSWORD_HASH!)
      const encryptedPasswords = await prisma.password.findMany({
        where: {
          userId: input.userId,
        },
      })
      const passwords = encryptedPasswords.map(pass => ({
        ...pass,
        decrypted_password: cryptr.decrypt(pass.encryptedPassword),
      }))

      return passwords
    },
  }).mutation('create', {
    input: z.object({
      name: z.string(),
      login: z.string(),
      password: z.string(),
    }),
    resolve: async ({ input }) => {
      const cryptr = new Cryptr(process.env.PASSWORD_HASH!)
      const { name, login, password } = input
      const userId = 'get-it-somehow'
      const encryptedPassword = cryptr.encrypt(password)
      await prisma.password.create({
        data: {
          encryptedPassword,
          name,
          login,
          userId,
        },
      })
    },
  }).mutation('update', {
    input: z.object({
      name: z.string(),
      login: z.string(),
      password: z.string(),
      id: z.string(),
    }),
    resolve: async ({ input }) => {
      const cryptr = new Cryptr(process.env.PASSWORD_HASH!)
      const { name, login, password, id } = input
      const encryptedPassword = cryptr.encrypt(password)
      const updatedPassword = await prisma.password.update({
        where: {
          id,
        },
        data: {
          encryptedPassword,
          name,
          login,
        },
      })
      const decryptedPassword = cryptr.decrypt(updatedPassword.encryptedPassword)
      return { ...updatedPassword, decrypted_password: decryptedPassword }
    },
  }).mutation('delete', {
    input: z.object({
      passwordId: z.string(),
    }),
    resolve: async ({ input }) => {
      await prisma.password.delete({
        where: {
          id: input.passwordId,
        },
      })
    },
  })
