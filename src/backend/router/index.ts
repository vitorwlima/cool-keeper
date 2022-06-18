
import superjson from 'superjson'
import { createRouter } from './context'
import { passwordsRouter } from './passwords'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('passwords.', passwordsRouter)

export type AppRouter = typeof appRouter;
