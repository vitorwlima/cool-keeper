import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import { z } from 'zod'
import { prisma } from '../db/prisma'
import { createRouter } from './context'

export const usersRouter = createRouter()
  .mutation('create', {
    input: z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    }),
    resolve: async ({ input }) => {
      const { name, email, password } = input
      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)
      const masterPassword = v4()
      const masterHash = await bcrypt.genSalt(12)
      const masterPasswordHash = await bcrypt.hash(masterPassword, masterHash)
      
      await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          masterPasswordHash,
          refreshToken: '',
          masterToken: '',
        },
      })
    },
  })
