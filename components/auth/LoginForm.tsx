'use client'

import {
  FormCard,
  FormCardBody,
  FormCardFooter,
  FormCardHeader,
} from '@/components/FormCard'
import { Form } from '@/components/ui/form'
import { LoginSchema } from '@/schemas/user-validation'
import { Field } from '@/types/form-card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type LoginFormData = z.infer<typeof LoginSchema>

const LoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginFormData) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormCard>
          <FormCardHeader formHeader="Login to your account" />
          <FormCardBody form={form} fields={fields} />
          <FormCardFooter
            actionBtnLabel="Login"
            backBtnMessage="Don't have an account?"
            backBtnLinkLabel="Register"
            backBtnLinkHref="/auth/register"
          />
        </FormCard>
      </form>
    </Form>
  )
}

const fields: Field[] = [
  { label: 'Email', placeholder: 'janedoe@example.com', type: 'email' },
  { label: 'Password', placeholder: '********', type: 'password' },
]

export default LoginForm
