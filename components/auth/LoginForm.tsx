'use client'

import {
  FormActionButton,
  FormCard,
  FormCardBody,
  FormCardError,
  FormCardFooter,
  FormCardHeader,
} from '@/components/FormCard'
import { Form } from '@/components/ui/form'
import { handleError } from '@/lib/handleError'
import { LoginSchema } from '@/schemas/userValidation'
import { Field } from '@/types/formCard'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
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
  const router = useRouter()
  const [error, setError] = useState('')

  const onSubmit = async (data: LoginFormData) => {
    try {
      await axios.post('/api/auth/login', data)
      router.push('/')
    } catch (error) {
      const err = handleError(error)
      setError(err)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormCard>
          <FormCardHeader formHeader="Login to your account" />
          <FormCardBody form={form} fields={fields} />
          {error && <FormCardError message={error} />}
          <FormCardFooter
            redirectMessage="Don't have an account?"
            redirectLinkLabel="Register"
            redirectLinkHref="/auth/register"
          >
            <FormActionButton label="Login" />
          </FormCardFooter>
        </FormCard>
      </form>
    </Form>
  )
}

const fields: Field[] = [
  { label: 'Email', placeholder: 'Enter your email', type: 'email' },
  { label: 'Password', placeholder: 'Enter your password', type: 'password' },
]

export default LoginForm
