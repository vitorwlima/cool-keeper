import axios from 'axios'
import type { NextPage } from 'next'
import { useState } from 'react'

const Home: NextPage = () => {
  const [passwords, setPasswords] = useState<
    { id: string; encrypted_password: string; name: string }[]
  >([])
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const getPasswords = async () => {
    try {
      const { data } = await axios.get('/api/passwords')
      setPasswords(data.passwords)
    } catch (err) {
      console.log(err)
    }
  }

  const createPassword = async () => {
    try {
      await axios.post('/api/password', {
        name,
        password,
      })

      setName('')
      setPassword('')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div>
        <label>
          Nome:
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Senha:
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>

      <div>
        <button onClick={() => createPassword()}>Create</button>
        <button onClick={() => getPasswords()}>Fetch</button>
      </div>

      <h1>Passwords:</h1>
      <div>
        {passwords.map((pass) => (
          <div key={pass.id}>
            <div>id: {pass.id}</div>
            <div>name: {pass.name}</div>
            <div>encrypted_password: {pass.encrypted_password}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
