'use client'

import {
  FormActionButton,
  FormCard,
  FormCardBody,
  FormCardFooter,
  FormCardHeader,
} from '@/components/FormCard'
import { useSignup } from '@/hooks/auth/useSignup'
import { handleError } from '@/lib/handleError'
import { SignupSchema } from '@/schemas/userValidation'
import { Field, SignupFormData } from '@/types/formCard'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import ToastContainer from '../ui/toast'
import SocialAuth from './SocialAuth'

const SignupForm = () => {
  const router = useRouter()
  const signupMutation = useSignup()

  const onSubmit = async (data: Partial<SignupFormData>) => {
    try {
      await signupMutation.mutateAsync(data)
      router.push('/auth/signin/?verificationLink=sent')
    } catch (error) {
      const err = handleError(error)
      toast.error(err)
    }
  }

  return (
    <>
      <ToastContainer />
      <FormCard>
        <FormCardHeader header="Signup a New Account" />
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
        </FormCardBody>
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
