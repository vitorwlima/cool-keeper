import type { GetServerSideProps, NextPage } from 'next'
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
  return (
    <main>
      <section className="bg-primary text-primary-content flex flex-col items-center justify-center py-12">
        <h3 className="text-3xl">{passwords.length}</h3>
        <strong className="text-lg mt-2">Passwords are secured</strong>
      </section>
      <section className="p-4 max-w-5xl mx-auto">
        <h2 className="font-semibold mb-4 text-lg">Passwords</h2>
        <PasswordsList passwords={passwords} />
      </section>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const passwords = await getPasswords()

  return {
    props: {
      passwords,
    },
  }
}

export default MyKeeper
