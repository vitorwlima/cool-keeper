import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { setAuthLevelToRoute } from 'src/utils/setAuthLevelToRoute'

const Home: NextPage = () => {
  return (
    <div>
      <h1>Landing page here</h1>
      <div>
        <Link href='/sign-in'>
          <a>
            <span className='btn btn-primary'>Sign In</span>
          </a>
        </Link>
        <Link href='/register'>
          <a>
            <span className='btn btn-secondary'>Register now</span>
          </a>
        </Link>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return setAuthLevelToRoute('guest', ctx)
}

export default Home
