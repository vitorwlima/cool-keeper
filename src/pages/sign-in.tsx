import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRef } from 'react'
import { Input } from 'src/components/Input'
import { setAuthLevelToRoute } from 'src/utils/setAuthLevelToRoute'

type FormData = {
  email: string
  password: string
}

const SignIn: NextPage = () => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    // const { email, password } = data
    formRef.current?.setErrors({})

    // login here
    const res: any = { ok: true }

    if (res.ok) {
      window.location.reload()
      return
    }

    formRef.current?.setErrors({
      password: 'Invalid email or password.',
    })
  }

  return (
    <>
      <Head>
        <title>Cool Keeper - Sign in</title>
        <meta property='og:title' content='Cool Keeper - Sign in' />
      </Head>

      <main>
        <section className='bg-primary text-primary-content flex flex-col items-center justify-center py-12 mb-12'>
          <strong className='text-4xl mt-2'>Cool Keeper</strong>
          <h1 className='text-center mt-4 text-xl'>Sign in</h1>
        </section>
        <section className='px-4'>
          <Form
            className='max-w-5xl mx-auto flex flex-col gap-2'
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <Input type='text' placeholder='john.doe@example.com' name='email' label='E-mail' />
            <Input type='password' placeholder='********' name='password' label='Password' />
            <button type='submit' className='btn btn-primary w-full mt-8'>
              Sign In
            </button>
            <p className='text-center mt-4 text-primary-content'>
              Don&apos;t have an account?{' '}
              <Link href='/register'>
                <a className='link'>Register now</a>
              </Link>
            </p>
          </Form>
        </section>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return setAuthLevelToRoute('guest', ctx)
}

export default SignIn
