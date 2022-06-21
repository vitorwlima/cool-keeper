
import superjson from 'superjson'
import { createRouter } from './context'
import { passwordsRouter } from './passwords'
import { usersRouter } from './users'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('passwords.', passwordsRouter)
  .merge('users.', usersRouter)

export type AppRouter = typeof appRouter
