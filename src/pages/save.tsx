import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { Input } from 'src/components/Input'
import { notify } from 'src/utils/notify'
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
    }
  })

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    const { login, name, password } = data

    mutate({
      login,
      name,
      password,
      userId: session?.user.id || ''
    })
  }

  return (
    <>
      <Head>
        <title>Cool Keeper - Save new password</title>
        <meta property='og:title' content='Cool Keeper - Save new password' />
      </Head>

      <main>
        <section className="bg-primary text-primary-content flex flex-col items-center justify-center py-12">
          <strong className="text-lg mt-2">Save new password</strong>
        </section>
        <section className="p-4 max-w-5xl mx-auto">
          <Form className="flex flex-col gap-3" onSubmit={handleSubmit} ref={formRef}>
            <div className="form-control w-full">
              <Input
                name="name"
                type="text"
                placeholder="Platform X"
                label="Name"
              />
            </div>
            <div className="form-control w-full">
              <Input
                name="login"
                type="text"
                placeholder="john.doe@example.com"
                label="Login"
              />
            </div>
            <div className="form-control w-full">
              <Input
                name="password"
                type="password"
                placeholder="********"
                label="Password"
              />
            </div>
            <button
              className={`btn btn-primary mt-6 ${isLoading ? 'loading' : ''}`}
              type="submit"
              disabled={isLoading}
            >
              Save
            </button>
          </Form>
        </section>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  const isAuthenticated = !!session?.user.id

  if (!isAuthenticated) {
    return {
      redirect: {
        permanent: true,
        destination: '/'
      }
    }
  }

  return {
    props: {}
  }
}

export default SavePassword
