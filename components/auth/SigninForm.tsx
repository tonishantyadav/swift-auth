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
import { handleError, handleProviderError } from '@/lib/handleError'
import { SigninSchema } from '@/schemas/userValidation'
import { Field, SigninFormData } from '@/types/formCard'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const SigninForm = () => {
  const router = useRouter()
  const params = useSearchParams()
  const signinMutation = useSignin()
  const [error, setError] = useState('')

  const providerError = handleProviderError(params)

  const onSubmit = async (data: SigninFormData) => {
    try {
      const response = await signinMutation.mutateAsync(data)
      router.push('/')
    } catch (error) {
      const err = handleError(error)
      setError(err)
    }
  }

  return (
    <FormCard>
      <FormCardHeader header="Signin to your account" />
      <FormCardBody
        onSubmit={onSubmit}
        fields={fields}
        schema={SigninSchema}
        defaultValues={defaultValues}
      >
        <FormActionButton
          label="Login"
          isSubmitting={signinMutation.isPending}
        />
        {(error || providerError) && (
          <FormCardError message={error || providerError} />
        )}
      </FormCardBody>
      <FormCardFooter
        message="Don't have an account?"
        linkLabel="Signup"
        linkHref="/auth/signup"
      />
    </FormCard>
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
