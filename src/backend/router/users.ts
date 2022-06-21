import bcrypt from 'bcrypt'
import { z } from 'zod'
import { prisma } from '../db/prisma'
import { createRouter } from './context'

export const usersRouter = createRouter()
  .mutation('create', {
    input: z.object({
      name: z.string(),
      login: z.string(),
      password: z.string(),
    }),
    resolve: async ({ input }) => {
      const { name, login, password } = input
      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)
      await prisma.user.create({
        data: {
          name,
          login,
          passwordHash,
        },
      })
    },
  })
