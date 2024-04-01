'use client'

import {
  FormActionButton,
  FormCard,
  FormCardBody,
  FormCardError,
  FormCardFooter,
  FormCardHeader,
} from '@/components/FormCard'
import { handleError } from '@/lib/handleError'
import { SignupSchema } from '@/schemas/userValidation'
import { Field, SignupFormData } from '@/types/formCard'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SignupForm = () => {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: Partial<SignupFormData>) => {
    try {
      setIsSubmitting(true)
      await axios.post('/api/auth/signup', data)
      router.push('/')
    } catch (error) {
      const err = handleError(error)
      setIsSubmitting(false)
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
        <FormActionButton label="Signup" isSubmitting={isSubmitting} />
        {error && <FormCardError message={error} />}
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
