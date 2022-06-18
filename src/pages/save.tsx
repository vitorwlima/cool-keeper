import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { trpc } from 'src/lib/trpc'

const SavePassword: NextPage = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const trpcContext = trpc.useContext()
  const [name, setName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const { mutate, isLoading } = trpc.useMutation('passwords.create', {
    onSuccess: () => {
      trpcContext.invalidateQueries(['passwords.get'])
      router.push('/')
    }
  })

  const handleSavePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    mutate({
      login,
      name,
      password,
      userId: session?.user.id || ''
    })
  }

  return (
    <main>
      <section className="bg-primary text-primary-content flex flex-col items-center justify-center py-12">
        <strong className="text-lg mt-2">Save new password</strong>
      </section>
      <section className="p-4 max-w-5xl mx-auto">
        <form className="flex flex-col gap-3" onSubmit={handleSavePassword}>
          <div className="form-control w-full">
            <label className="label flex flex-col items-start">
              <span className="label-text mb-2">Name</span>
              <input
                type="text"
                placeholder="Platform X"
                className="input input-bordered w-full"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className="form-control w-full">
            <label className="label flex flex-col items-start">
              <span className="label-text mb-2">Login</span>
              <input
                type="text"
                placeholder="john.doe@example.com"
                className="input input-bordered w-full"
                name="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </label>
          </div>
          <div className="form-control w-full">
            <label className="label flex flex-col items-start">
              <span className="label-text mb-2">Password</span>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered w-full"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <button
            className={`btn btn-primary mt-6 ${isLoading ? 'loading' : ''}`}
            type="submit"
            disabled={!name || !login || !password || isLoading}
          >
            Save
          </button>
        </form>
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
        destination: '/'
      }
    }
  }

  return {
    props: {}
  }
}

export default SavePassword
