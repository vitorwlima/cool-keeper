import { FC } from 'react'
import { FiCopy, FiTrash } from 'react-icons/fi'
import { inferQueryResponse } from 'src/pages/api/trpc/[trpc]'
import { notify } from 'src/utils/notify'
import { trpc } from 'src/utils/trpc'

type Props = {
  passwords: inferQueryResponse<'passwords.get'>
}

export const PasswordsList: FC<Props> = ({ passwords }) => {
  if (passwords.length === 0) {
    return <p className="text-center text-xl">No saved passwords :(</p>
  }

  const trpcContext = trpc.useContext()
  const { mutate } = trpc.useMutation('passwords.delete', {
    onSuccess: () => {
      notify('success', 'Password deleted successfully.')
      trpcContext.invalidateQueries('passwords.get')
    }
  })

  const handleCopyPassword = (password: string) => {
    navigator.clipboard.writeText(password)
  }

  const handleDeletePassword = (passwordId: string) => {
    mutate({ passwordId })
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
            <div className="flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => handleCopyPassword(password.decrypted_password)}
              >
                <FiCopy />
              </button>
              <button
                className="btn"
                onClick={() => handleDeletePassword(password.id)}
              >
                <FiTrash />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
