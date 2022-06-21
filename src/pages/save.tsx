import { FormHandles, SubmitHandler } from '@unform/core'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { PasswordForm } from 'src/components/PasswordForm'
import { notify } from 'src/utils/notify'
import { setAuthLevelToRoute } from 'src/utils/setAuthLevelToRoute'
import { trpc } from 'src/utils/trpc'

type FormData = {
  login: string
  name: string
  password: string
}

const SavePassword: NextPage = () => {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)
  const { data: session } = useSession()
  const trpcContext = trpc.useContext()

  const { mutate, isLoading } = trpc.useMutation('passwords.create', {
    onSuccess: () => {
      notify('success', 'Password saved successfully.')
      trpcContext.invalidateQueries(['passwords.get'])
    },
    onSettled: () => {
      router.push('/')
    },
  })

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    const { login, name, password } = data

    mutate({
      login,
      name,
      password,
      userId: session?.user.id || '',
    })
  }

  return (
    <>
      <Head>
        <title>Cool Keeper - Save new password</title>
        <meta property='og:title' content='Cool Keeper - Save new password' />
      </Head>

      <main>
        <section className='bg-primary text-primary-content flex flex-col items-center justify-center py-12'>
          <strong className='text-lg mt-2'>Save new password</strong>
        </section>
        <section className='p-4 max-w-5xl mx-auto'>
          <PasswordForm formRef={formRef} isLoading={isLoading} onSubmit={handleSubmit} />
        </section>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return setAuthLevelToRoute('auth', ctx)
}

export default SavePassword
