import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

const Register: NextPage = () => {
  const router = useRouter()
  const [login, setLogin] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password !== passwordConfirmation) {
      console.info('Passwords do not match.')
      return
    }

    try {
      await axios.post('/api/register', {
        name,
        login,
        password
      })

      router.push('/sign-in')
    } catch (err) {
      console.info('Register error:', err)
    }
  }

  return (
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
  )
}

export default Register
