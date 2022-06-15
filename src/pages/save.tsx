import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

const SavePassword: NextPage = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleSavePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const body = {
      name,
      login,
      password,
    }

    try {
      await axios.post('/api/password', body)
      router.push('/my-keeper')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main>
      <section className="bg-primary text-primary-content flex flex-col items-center justify-center py-12">
        <strong className="text-lg mt-2">Save new password</strong>
      </section>
      <section className="p-4">
        <form className="flex flex-col gap-3" onSubmit={handleSavePassword}>
          <div className="form-control w-full max-w-lg">
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
          <div className="form-control w-full max-w-lg">
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
          <div className="form-control w-full max-w-lg">
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
            className="btn btn-primary mt-6"
            type="submit"
            disabled={!name || !login || !password}
          >
            Save
          </button>
        </form>
      </section>
    </main>
  )
}

export default SavePassword
