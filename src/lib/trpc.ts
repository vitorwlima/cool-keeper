import { createReactQueryHooks } from '@trpc/react'
import { AppRouter } from 'src/backend/router'

export const trpc = createReactQueryHooks<AppRouter>()
