import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { notify } from 'src/utils/notify'
import { trpc } from 'src/utils/trpc'

const Register: NextPage = () => {
  const router = useRouter()
  const [login, setLogin] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const { mutate } = trpc.useMutation('users.create', {
    onSuccess: () => {
      notify('success', 'Account created successfully.')
      router.push('/sign-in')
    }
  })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password !== passwordConfirmation) {
      notify('error', 'Passwords do not match.')
      return
    }

    mutate({
      name,
      login,
      password
    })
  }

  return (
    <>
      <Head>
        <title>Cool Keeper - Register</title>
        <meta property='og:title' content='Cool Keeper - Register' />
      </Head>

      <main>
        <section className="bg-secondary text-secondary-content flex flex-col items-center justify-center py-12">
          <strong className="text-4xl mt-2">Cool Keeper</strong>
        </section>
        <section>
          <h1 className="text-center mt-4 mb-12 text-xl">Register now</h1>
        </section>
        <section>
          <form className="max-w-5xl mx-auto" onSubmit={handleSubmit}>
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
            <label className="label flex flex-col items-start">
              <span className="label-text mb-2">Name</span>
              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
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
            <label className="label flex flex-col items-start">
              <span className="label-text mb-2">Password confirmation</span>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered w-full"
                name="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </label>
            <button type="submit" className="btn btn-secondary w-full mt-8">
            Create account
            </button>
          </form>
        </section>
      </main>
    </>
  )
}

export default Register
