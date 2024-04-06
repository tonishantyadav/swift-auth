'use client'

import {
  FormActionButton,
  FormCard,
  FormCardBody,
  FormCardFooter,
  FormCardHeader,
} from '@/components/FormCard'
import { useSignup } from '@/hooks/auth/useSignup'
import { handleError, handleProviderError } from '@/lib/handleError'
import { SignupSchema } from '@/schemas/userValidation'
import { Field, SignupFormData } from '@/types/formCard'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import ToastContainer from '../ui/toast'
import SocialAuth from './SocialAuth'

const SignupForm = () => {
  const params = useSearchParams()
  const signupMutation = useSignup()

  const providerError = handleProviderError(params)

  useEffect(() => {
    if (providerError) toast.error(providerError)
  }, [providerError])

  const onSubmit = async (data: Partial<SignupFormData>) => {
    try {
      const response = await signupMutation.mutateAsync(data)
      toast.success(response.success)
    } catch (error) {
      const err = handleError(error)
      toast.error(err)
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
        <ToastContainer />
        <FormActionButton
          label="Signup"
          isSubmitting={signupMutation.isPending}
        />
      </FormCardBody>
      <FormCardFooter
        message="Already have an account?"
        linkLabel="Signin"
        linkHref="/auth/signin"
      >
        <SocialAuth message="Or Signup with" />
      </FormCardFooter>
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
