import { withTRPC } from '@trpc/next'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppRouter } from 'src/backend/router'
import 'src/styles/global.css'
import superjson from 'superjson'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </SessionProvider>
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
