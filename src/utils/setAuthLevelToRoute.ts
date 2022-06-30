import { GetServerSidePropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'

type AuthLevel = 'auth' | 'guest'

export const setAuthLevelToRoute = async (
  authLevel: AuthLevel,
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
) => {
  const isAuthenticated = true

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
