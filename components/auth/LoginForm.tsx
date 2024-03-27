'use client'

import { LoginFormSchema } from '@/app/schemas/form-validation'
import { Field } from '@/app/types/form-card'
import {
  FormCard,
  FormCardBody,
  FormCardFooter,
  FormCardHeader,
} from '@/components/FormCard'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type LoginFormData = z.infer<typeof LoginFormSchema>

const LoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const fields: Field[] = [
    { label: 'Email', placeholder: 'janedoe@example.com', type: 'email' },
    { label: 'Password', placeholder: '******', type: 'password' },
  ]

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

export default LoginForm
