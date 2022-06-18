import { FC } from 'react'
import { FiCopy } from 'react-icons/fi'

type Props = {
  passwords: {
    id: string
    name: string
    login: string
    decrypted_password: string
  }[]
}

export const PasswordsList: FC<Props> = ({ passwords }) => {
  if (passwords.length === 0) {
    return <p className="text-center text-xl">No saved passwords :(</p>
  }

  const handleCopyPassword = (password: string) => {
    navigator.clipboard.writeText(password)
  }

  return (
    <ul className="flex flex-col gap-4">
      {passwords.map((password) => (
        <li className="card shadow-xl" key={password.id}>
          <div className="flex p-4 justify-between w-full">
            <div>
              <h4 className="card-title">{password.name}</h4>
              <p>{password.login}</p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleCopyPassword(password.decrypted_password)}
            >
              <FiCopy />
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
