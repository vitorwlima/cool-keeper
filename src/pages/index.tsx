import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <h1>Landing page here</h1>
      <div>
        <Link href="/sign-in">
          <a>
            <span className="btn btn-primary">Sign In</span>
          </a>
        </Link>
        <Link href="/register">
          <a>
            <span className="btn btn-secondary">Register now</span>
          </a>
        </Link>
      </div>
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
        permanent: true
      }
    }
  }

  return {
    props: {}
  }
}

export default Home
