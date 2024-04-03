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
import { handleError, handleProviderError } from '@/lib/handleError'
import { SignupSchema } from '@/schemas/userValidation'
import { Field, SignupFormData } from '@/types/formCard'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const SignupForm = () => {
  const router = useRouter()
  const params = useSearchParams()
  const signupMutation = useSignup()
  const [error, setError] = useState('')

  const providerError = handleProviderError(params)

  const onSubmit = async (data: Partial<SignupFormData>) => {
    try {
      await signupMutation.mutateAsync(data)
      router.push('/')
    } catch (error) {
      const err = handleError(error)
      setError(err)
    }
  }

  return (
    <FormCard>
      <FormCardHeader header="Signup a new account" />
      <FormCardBody
        onSubmit={onSubmit}
        schema={SignupSchema}
        fields={fields}
        defaultValues={defaultValues}
      >
        <FormActionButton
          label="Signup"
          isSubmitting={signupMutation.isPending}
        />
        {(error || providerError) && (
          <FormCardError message={error || providerError} />
        )}
      </FormCardBody>
      <FormCardFooter
        message="Already have an account?"
        linkLabel="Signin"
        linkHref="/auth/signin"
      />
    </FormCard>
  )
}

const defaultValues: SignupFormData = { name: '', email: '', password: '' }

const fields: Field[] = [
  { label: 'Name', placeholder: 'Enter your name', type: 'text' },
  { label: 'Email', placeholder: 'Enter your email', type: 'email' },
  { label: 'Password', placeholder: 'Enter your password', type: 'password' },
]

export default SignupForm
