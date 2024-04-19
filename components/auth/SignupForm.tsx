'use client'

import {
  FormActionButton,
  FormCard,
  FormCardBody,
  FormCardError,
  FormCardFooter,
  FormCardHeader,
} from '@/components/FormCard'
import { useSignup } from '@/hooks/auth/useSignup'
import { handleError } from '@/lib/error'
import { SignupSchema } from '@/schemas/validation'
import { Field, SignupFormData } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Form } from '../ui/form'
import ToastContainer from '../ui/toast'
import SocialAuth from './SocialAuth'

const SignupForm = () => {
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: { ...defaultValues },
  })
  const router = useRouter()
  const signup = useSignup()
  const [error, setError] = useState('')

  const onSubmit = async (data: Partial<SignupFormData>) => {
    try {
      const response = await signup.mutateAsync(data)
      toast.success(response.success)
      form.reset()
    } catch (error) {
      const errorMessage = handleError(error)
      setError(errorMessage)
    }
  }

  if (signup.isSuccess) {
    setTimeout(() => router.push('/auth/signin'), 2000)
  }

  return (
    <>
      <ToastContainer />
      <FormCard>
        <FormCardHeader header="Signup a New Account" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormCardBody form={form} fields={fields}>
              <FormActionButton
                label="Signup"
                isSubmitting={signup.isPending}
              />
              {error && <FormCardError message={error} />}
            </FormCardBody>
          </form>
        </Form>
        <FormCardFooter
          message="Already have an account?"
          linkLabel="Signin"
          linkHref="/auth/signin"
        >
          <SocialAuth message="Or Signup with" />
        </FormCardFooter>
      </FormCard>
    </>
  )
}

const defaultValues: SignupFormData = { name: '', email: '', password: '' }

const fields: Field[] = [
  { label: 'Name', placeholder: 'Enter your name', type: 'text' },
  { label: 'Email', placeholder: 'Enter your email', type: 'email' },
  { label: 'Password', placeholder: 'Enter your password', type: 'password' },
]

export default SignupForm
