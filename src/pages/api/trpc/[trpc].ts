import { inferProcedureOutput } from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { AppRouter, appRouter } from 'src/backend/router'
import { createContext } from 'src/backend/router/context'

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})

export type inferQueryResponse<
  TRouteKey extends keyof AppRouter['_def']['queries']
> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;
