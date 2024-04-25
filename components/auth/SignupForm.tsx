'use client'

import {
  FormActionButton,
  FormCard,
  FormCardBody,
  FormCardError,
  FormCardFooter,
  FormCardHeader,
} from '@/components/FormCard'
import { SocialAuth } from '@/components/auth'
import { Form } from '@/components/ui/form'
import ToastContainer from '@/components/ui/toast'
import { useSignup } from '@/hooks/auth/useSignup'
import { handleError } from '@/lib/error'
import { SignupSchema } from '@/schemas/validation'
import { Field, SignupFormData } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

const SignupForm = () => {
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: { ...defaultValues },
  })
  const router = useRouter()
  const signup = useSignup()
  const [error, setError] = useState('')
  const [token, setToken] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (signup.isSuccess && token) {
      router.push(`/auth/verify/email?token=${token}&success=${success}`)
    }
  }, [signup.isSuccess, token, success, router])

  const onSubmit = async (data: Partial<SignupFormData>) => {
    try {
      const response = await signup.mutateAsync(data)
      if (response.data) {
        setSuccess(response.success)
        setToken(response.data.token)
      }
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
              {error && <FormCardError message={error} />}
              <FormActionButton
                label="Signup"
                isSubmitting={signup.isPending}
              />
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
