import { FormHandles, SubmitHandler } from '@unform/core'
import { useRouter } from 'next/router'
import { FC, useRef, useState } from 'react'
import { inferQueryResponse } from 'src/pages/api/trpc/[trpc]'
import { notify } from 'src/utils/notify'
import { trpc } from 'src/utils/trpc'
import { PasswordCard } from '../PasswordCard'
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
          <h2 className='font-semibold text-xl text-primary-content'>Passwords</h2>
          <button className='btn btn-primary' onClick={() => handleRedirectSaveNewPassword()}>
            Save new
          </button>
        </header>
        <ul className='flex flex-col gap-4 overflow-y-scroll max-h-[calc(100vh_-_306px)] px-4 scrollbar-thumb-zinc-800 scrollbar-thin'>
          {passwords.length ? (
            passwords.map((password) => (
              <PasswordCard
                password={password}
                key={password.id}
                editPassword={handleSetEditingPassword}
                active={password.id === editingPassword?.id}
              />
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
