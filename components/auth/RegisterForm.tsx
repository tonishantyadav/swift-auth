'use client'

import { RegisterFormSchema } from '@/app/schemas/form-validation'
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

type LoginFormData = z.infer<typeof RegisterFormSchema>

const RegisterForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const fields: Field[] = [
    { label: 'Name', placeholder: 'Jane Doe', type: 'text' },
    { label: 'Email', placeholder: 'janedoe@example.com', type: 'email' },
    { label: 'Password', placeholder: '******', type: 'password' },
  ]

  const onSubmit = (data: LoginFormData) => {}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormCard>
          <FormCardHeader formHeader="Register a new account" />
          <FormCardBody form={form} fields={fields} />
          <FormCardFooter
            actionBtnLabel="Register"
            backBtnMessage="Already have an account?"
            backBtnLinkLabel="Login"
            backBtnLinkHref="/auth/login"
          />
        </FormCard>
      </form>
    </Form>
  )
}

export default RegisterForm
