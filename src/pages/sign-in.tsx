import type { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

const SignIn: NextPage = () => {
  const router = useRouter()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const res: any = await signIn('credentials', {
      login,
      password,
      redirect: false,
    })

    console.log(res)

    if (res.ok) {
      router.push('/my-keeper')
      return
    }

    console.info('Wrong credentials. Try again.')
  }

  return (
    <main>
      <section className="bg-primary text-primary-content flex flex-col items-center justify-center py-12">
        <strong className="text-4xl mt-2">Cool Keeper</strong>
      </section>
      <section>
        <h1 className="text-center mt-4 mb-12 text-xl">Sign in now</h1>
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
          <button type="submit" className="btn btn-primary w-full mt-8">
            Sign In
          </button>
        </form>
      </section>
    </main>
  )
}

export default SignIn
