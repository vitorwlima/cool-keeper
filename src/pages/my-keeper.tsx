import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { PasswordsList } from 'src/components/PasswordsList'
import { getPasswords } from 'src/lib/prisma-helpers/getPasswords'

type Props = {
  passwords: {
    id: string
    name: string
    login: string
    decrypted_password: string
  }[]
}

const MyKeeper: NextPage<Props> = ({ passwords }) => {
  const router = useRouter()

  const handleRedirectSaveNewPassword = () => {
    router.push('/save')
  }

  return (
    <main>
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
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  const isAuthenticated = !!session?.user.id

  if (!isAuthenticated) {
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
    }
  }

  const passwords = await getPasswords()

  return {
    props: {
      passwords,
    },
  }
}

export default MyKeeper
