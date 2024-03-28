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
import { RegisterSchema } from '@/schemas/user-validation'
import { Field } from '@/types/form-card'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type LoginFormData = z.infer<typeof RegisterSchema>

const RegisterForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })
  const router = useRouter()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: LoginFormData) => {
    await axios
      .post('/api/auth/register', data)
      .then((response) => {
        setIsSubmitting(true)
        router.push('/auth/login')
      })
      .catch((error: Error | AxiosError) => {
        setIsSubmitting(false)
        if (axios.isAxiosError(error))
          setError(
            error.response?.data.error || 'An unexpected error occurred!'
          )
        else setError('An unexpected error occurred!')
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormCard>
          <FormCardHeader formHeader="Register a new account" />
          <FormCardBody form={form} fields={fields} />
          {error && <FormCardError message={error} />}
          <FormCardFooter
            redirectMessage="Already have an account?"
            redirectLinkLabel="Login"
            redirectLinkHref="/auth/login"
          >
            <FormActionButton label="Register" disabled={isSubmitting} />
          </FormCardFooter>
        </FormCard>
      </form>
    </Form>
  )
}

const fields: Field[] = [
  { label: 'Name', placeholder: 'Enter your name', type: 'text' },
  { label: 'Email', placeholder: 'Enter your email', type: 'email' },
  { label: 'Password', placeholder: 'Enter your password', type: 'password' },
]

export default RegisterForm
