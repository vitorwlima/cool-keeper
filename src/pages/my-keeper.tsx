import type { NextPage } from 'next'
import { PasswordsList } from 'src/components/PasswordsList'

const passwords = [
  {
    id: '1',
    name: 'LinkedIn',
    login: 'vitorwlima13@gmail.com',
    decrypted_password: 'hello123',
  },
  {
    id: '2',
    name: 'Twitter',
    login: 'vitor-teste@outlook.com',
    decrypted_password: 'dsajipddsa80d8sa',
  },
  {
    id: '3',
    name: 'GitHub',
    login: 'vitorwlima',
    decrypted_password: '.dsa9dsa2_92-a',
  },
]

const MyKeeper: NextPage = () => {
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

export default MyKeeper
