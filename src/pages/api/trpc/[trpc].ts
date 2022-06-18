import * as trpcNext from '@trpc/server/adapters/next'
import { appRouter } from 'src/backend/router'
import { createContext } from 'src/backend/router/context'

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext
})
