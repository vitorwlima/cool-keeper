import { withTRPC } from '@trpc/next'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppRouter } from 'src/backend/router'
import 'src/styles/global.css'
import superjson from 'superjson'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Cool Keeper</title>
        <meta name='description' content='Password manager of the future' />
        <meta property='og:title' content='Cool Keeper' />
        <meta
          property='og:description'
          content='Password manager of the future'
        />
        <meta property='og:type' content='website' />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </SessionProvider>
    </>
  )
}

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return ''
  }

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`

  return `http://localhost:${process.env.PORT ?? 3000}`
}

export default withTRPC<AppRouter>({
  config ({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`

    return {
      headers: () => {
        return {
          cookie: ctx?.req?.headers.cookie
        }
      },
      url,
      transformer: superjson
    }
  },
  ssr: true
})(MyApp)
