import type { GetServerSideProps, NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PasswordsList } from 'src/components/PasswordsList'
import { setAuthLevelToRoute } from 'src/utils/setAuthLevelToRoute'
import { trpc } from 'src/utils/trpc'

const MyKeeper: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { data: passwords, isLoading, error } = trpc.useQuery(['passwords.get', { userId: session?.user.id || '' }])

  if (error) return <div>An error has occurred. Try again later.</div>
  if (!passwords || isLoading) return <div>Loading...</div>

  const handleRedirectSaveNewPassword = () => {
    router.push('/save')
  }

  const handleLogout = async () => {
    await signOut({
      redirect: false
    })

    window.location.reload()
  }

  return (
    <>
      <Head>
        <title>Cool Keeper - My passwords</title>
        <meta property='og:title' content='Cool Keeper - My passwords' />
      </Head>

      <main>
        <button className="btn absolute top-2 right-2" onClick={handleLogout}>
          Logout
        </button>
        <section className="bg-primary text-primary-content flex flex-col items-center justify-center py-12">
          <h3 className="text-3xl">{passwords.length}</h3>
          <strong className="text-lg mt-2">Passwords are secured</strong>
        </section>
        <section className="p-4 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-semibold text-lg">Passwords</h2>
            <button
              className="btn btn-primary"
              onClick={() => handleRedirectSaveNewPassword()}
            >
              Save new
            </button>
          </div>
          <PasswordsList passwords={passwords} />
        </section>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return setAuthLevelToRoute('auth', ctx)
}

export default MyKeeper
