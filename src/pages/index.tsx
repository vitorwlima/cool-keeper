import type { GetServerSideProps, NextPage } from 'next'
import { getSession, signIn, useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  return (
    <div>
      <h1>Landing page here</h1>
      <button
        onClick={() =>
          signIn('credentials', {
            login: 'vitorwlima13',
            password: 'legalzaotop123',
          })
        }
      >
        Login
      </button>
      <div>name: {session?.user?.name}</div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  const isAuthenticated = !!session?.user.id

  if (isAuthenticated) {
    return {
      redirect: {
        destination: '/my-keeper',
        permanent: true,
      },
    }
  }

  return {
    props: {},
  }
}

export default Home
