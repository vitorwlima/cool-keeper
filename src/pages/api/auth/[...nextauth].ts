import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from 'src/backend/db/prisma'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        login: { label: 'Login', type: 'text', placeholder: 'JohnDoe123' },
        password: { label: 'Password', type: 'password', placeholder: '********' },
      },
      authorize: async (credentials, req) => {
        if (!credentials?.login || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            login: credentials.login,
          },
        })

        if (!user) {
          return null
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.passwordHash)

        if (!isCorrectPassword) {
          return null
        }

        return user
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          name: session.user.name,
          id: token.sub as string,
        },
      }
    },
  },
  pages: {
    signIn: '/sign-in',
  },
})
