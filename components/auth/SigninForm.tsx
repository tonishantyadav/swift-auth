'use client'

import {
  FormActionButton,
  FormCard,
  FormCardBody,
  FormCardFooter,
  FormCardHeader,
} from '@/components/FormCard'
import { useSignin } from '@/hooks/auth/useSignin'
import { handleError } from '@/lib/handleError'
import { SigninSchema } from '@/schemas/userValidation'
import { Field, SigninFormData } from '@/types/formCard'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import ToastContainer from '../ui/toast'
import SocialAuth from './SocialAuth'

const SigninForm = () => {
  const router = useRouter()
  const params = useSearchParams()
  const signinMutation = useSignin()

  useEffect(() => {
    if (params.get('error') === 'OAuthAccountNotLinked') {
      toast.error('Email is already in use with different provider.')
      router.replace('/auth/signin')
    } else if (params.get('verificationLink') === 'sent') {
      toast.success('Verification link has been sent to your email.')
      router.replace('/auth/signin')
    }
  }, [params])

  const onSubmit = async (data: SigninFormData) => {
    try {
      const response = await signinMutation.mutateAsync(data)
      router.push('/')
    } catch (error) {
      const err = handleError(error)
      toast.error(err)
    }
  }

  return (
    <FormCard>
      <FormCardHeader header="Signin to Your Account" />
      <FormCardBody
        onSubmit={onSubmit}
        fields={fields}
        schema={SigninSchema}
        defaultValues={defaultValues}
      >
        <FormActionButton
          label="Signin"
          isSubmitting={signinMutation.isPending}
        />
      </FormCardBody>
      <FormCardFooter
        message="Don't have an account?"
        linkLabel="Signup"
        linkHref="/auth/signup"
      >
        <ToastContainer />
        <SocialAuth message="Or Signin with" />
      </FormCardFooter>
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
