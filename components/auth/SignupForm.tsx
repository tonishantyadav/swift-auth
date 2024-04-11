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
import { handleError } from '@/lib/handleError'
import { SignupSchema } from '@/schemas/userValidation'
import { Field, SignupFormData } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
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
  const signupMutation = useSignup()
  const [error, setError] = useState('')

  const onSubmit = async (data: Partial<SignupFormData>) => {
    try {
      const response = await signupMutation.mutateAsync(data)
      toast.success(response.success)
      form.reset()
    } catch (error) {
      const errorMessage = handleError(error)
      setError(errorMessage)
    }
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
                isSubmitting={signupMutation.isPending}
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
