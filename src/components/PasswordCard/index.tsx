import classNames from 'classnames'
import { FC, MouseEvent } from 'react'
import { FiCopy } from 'react-icons/fi'
import { inferQueryResponse } from 'src/pages/api/trpc/[trpc]'
import { notify } from 'src/utils/notify'

type Props = {
  password: inferQueryResponse<'passwords.get'>[number]
  editPassword: (password: inferQueryResponse<'passwords.get'>[number]) => void
  active: boolean
}

export const PasswordCard: FC<Props> = ({ password, editPassword, active }) => {
  const handleCopyPassword = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    password: string,
  ) => {
    event.stopPropagation()
    navigator.clipboard.writeText(password)
    notify('success', 'Password copied to clipboard.')
  }

  return (
    <li
      className={classNames('shadow-xl cursor-pointer rounded-lg transition-colors', {
        'bg-base-300 hover:bg-base-200': !active,
        'bg-primary hover:bg-primary-focus text-primary-content': active,
      })}
      onClick={() => editPassword(password)}
    >
      <div className='flex p-4 justify-between w-full'>
        <div>
          <h4 className='card-title'>{password.name}</h4>
          <p>{password.login}</p>
        </div>
        <div className='flex gap-2'>
          <button
            className='flex items-center justify-center p-1 text-neutral-content hover:text-primary-content text-lg'
            onClick={(e) => handleCopyPassword(e, password.decrypted_password)}
          >
            <FiCopy />
          </button>
        </div>
      </div>
    </li>
  )
}
