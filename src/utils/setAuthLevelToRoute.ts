import { GetServerSidePropsContext, PreviewData } from 'next'
import { getSession } from 'next-auth/react'
import { ParsedUrlQuery } from 'querystring'

type AuthLevel = 'auth' | 'guest'

export const setAuthLevelToRoute = async (
  authLevel: AuthLevel,
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
) => {
  const session = await getSession(ctx)
  const isAuthenticated = !!session?.user.id

  if ((authLevel === 'auth' && isAuthenticated) || (authLevel === 'guest' && !isAuthenticated)) {
    return {
      props: {},
    }
  }

  return {
    redirect: {
      destination: isAuthenticated ? '/my-keeper' : '/',
      permanent: true,
    },
  }
}
