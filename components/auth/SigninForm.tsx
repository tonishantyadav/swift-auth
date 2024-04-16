'use client'

import {
  FormActionButton,
  FormCard,
  FormCardBody,
  FormCardError,
  FormCardFooter,
  FormCardHeader,
} from '@/components/FormCard'
import { useSignin } from '@/hooks/auth/useSignin'
import { handleCredentialsError, handleOAuthError } from '@/lib/error'
import { SigninSchema } from '@/schemas/validation'
import { Field, SigninFormData } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '../ui/form'
import SocialAuth from './SocialAuth'

const SigninForm = () => {
  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: { ...defaultValues },
  })
  const router = useRouter()
  const params = useSearchParams()
  const signinMutation = useSignin()
  const OAuthError = handleOAuthError(params)
  const [error, setError] = useState('')

  const onSubmit = async (data: SigninFormData) => {
    try {
      await signinMutation.mutateAsync(data)
      router.push('/')
    } catch (error) {
      const errorMessage = handleCredentialsError(error)
      setError(errorMessage)
    }
  }

  return (
    <>
      <FormCard>
        <FormCardHeader header="Signin to Your Account" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormCardBody form={form} fields={fields}>
              <FormActionButton
                label="Signin"
                isSubmitting={signinMutation.isPending}
              />
              {(error || OAuthError) && (
                <FormCardError message={error || OAuthError} />
              )}
            </FormCardBody>
          </form>
        </Form>
        <FormCardFooter
          message="Don't have an account?"
          linkLabel="Signup"
          linkHref="/auth/signup"
        >
          <SocialAuth message="Or Signin with" />
        </FormCardFooter>
      </FormCard>
    </>
  )
}

const defaultValues: SigninFormData = {
  email: '',
  password: '',
}

const fields: Field[] = [
  { label: 'Email', placeholder: 'Enter your email', type: 'email' },
  { label: 'Password', placeholder: 'Enter your password', type: 'password' },
]

export default SigninForm
