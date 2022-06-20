import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import { FC, Ref } from 'react'
import { Input } from '../Input'

type Props = {
  onSubmit: SubmitHandler<any>
  formRef: Ref<FormHandles>
  isLoading: boolean
}

export const PasswordForm: FC<Props> = ({ onSubmit, formRef, isLoading }) => {
  return (
    <Form className="flex flex-col gap-3" onSubmit={onSubmit} ref={formRef}>
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
  )
}
