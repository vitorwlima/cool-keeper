import { FormHandles, SubmitHandler } from '@unform/core'
import { useRouter } from 'next/router'
import { FC, MouseEvent, useRef, useState } from 'react'
import { FiCopy } from 'react-icons/fi'
import { inferQueryResponse } from 'src/pages/api/trpc/[trpc]'
import { notify } from 'src/utils/notify'
import { trpc } from 'src/utils/trpc'
import { PasswordForm } from '../PasswordForm'

type Props = {
  passwords: inferQueryResponse<'passwords.get'>
}

type FormData = {
  login: string
  name: string
  password: string
}

type Password = inferQueryResponse<'passwords.get'>[number]

export const PasswordsList: FC<Props> = ({ passwords }) => {
  const router = useRouter()
  const trpcContext = trpc.useContext()
  const formRef = useRef<FormHandles>(null)
  const [editingPassword, setEditingPassword] = useState<Password | undefined>(undefined)

  const { mutate: deleteMutate } = trpc.useMutation('passwords.delete', {
    onSuccess: () => {
      setEditingPassword(undefined)
      notify('success', 'Password deleted successfully.')
      trpcContext.invalidateQueries('passwords.get')
    },
  })

  const { mutate: updateMutate } = trpc.useMutation('passwords.update', {
    onSuccess: (data) => {
      setEditingPassword(data)
      notify('success', 'Password updated successfully.')
      trpcContext.invalidateQueries('passwords.get')
    },
  })

  const handleSetEditingPassword = (password: Password) => {
    if (Object.is(password, editingPassword)) {
      setEditingPassword(undefined)
      return
    }

    setEditingPassword(password)
  }

  const handleDeletePassword = () => {
    deleteMutate({ passwordId: editingPassword!.id })
  }

  const handleCopyPassword = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    password: string,
  ) => {
    event.stopPropagation()
    navigator.clipboard.writeText(password)
  }

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    updateMutate({ ...data, id: editingPassword!.id })
  }

  const handleRedirectSaveNewPassword = () => {
    router.push('/save')
  }

  return (
    <div className='flex gap-20'>
      <section className={`flex-1 lg:block ${editingPassword ? 'hidden' : ''}`}>
        <header className='flex items-center justify-between mb-8'>
          <h2 className='font-semibold text-lg'>Passwords</h2>
          <button className='btn btn-primary' onClick={() => handleRedirectSaveNewPassword()}>
            Save new
          </button>
        </header>
        <ul className='flex flex-col gap-4 overflow-y-scroll max-h-[calc(100vh_-_306px)] pr-4 scrollbar-thumb-zinc-800 scrollbar-thin'>
          {passwords.length ? (
            passwords.map((password) => (
              <li
                className='shadow-xl cursor-pointer'
                key={password.id}
                onClick={() => handleSetEditingPassword(password)}
              >
                <div className='flex p-4 justify-between w-full'>
                  <div>
                    <h4 className='card-title'>{password.name}</h4>
                    <p>{password.login}</p>
                  </div>
                  <div className='flex gap-2'>
                    <button
                      className='btn btn-primary'
                      onClick={(e) => handleCopyPassword(e, password.decrypted_password)}
                    >
                      <FiCopy />
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className='text-center text-xl'>No saved passwords :(</p>
          )}
        </ul>
      </section>
      {!!editingPassword && (
        <section className='flex-1'>
          <header className='mb-4 flex items-center justify-between'>
            <p className='text-2xl font-bold'>{editingPassword.name}</p>
            <button className='btn lg:hidden' onClick={() => setEditingPassword(undefined)}>
              Back
            </button>
          </header>
          <PasswordForm
            formRef={formRef}
            onSubmit={handleSubmit}
            isLoading={false}
            currentPassword={editingPassword}
            key={editingPassword.id}
            onDeletePassword={handleDeletePassword}
          />
        </section>
      )}
    </div>
  )
}
