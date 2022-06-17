import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import 'src/styles/global.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
