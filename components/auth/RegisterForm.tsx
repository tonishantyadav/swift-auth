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
import { RegisterSchema } from '@/schemas/userValidation'
import { Field, RegisterFormData } from '@/types/formCard'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const RegisterForm = () => {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: Partial<RegisterFormData>) => {
    try {
      setIsSubmitting(true)
      await axios.post('/api/auth/register', data)
      router.push('/')
    } catch (error) {
      const err = handleError(error)
      setIsSubmitting(false)
      setError(err)
    }
  }

  return (
    <FormCard>
      <FormCardHeader formHeader="Register a new account" />
      <FormCardBody
        onSubmit={onSubmit}
        schema={RegisterSchema}
        fields={fields}
        defaultValues={defaultValues}
      >
        <FormActionButton label="Register" isSubmitting={isSubmitting} />
        {error && <FormCardError message={error} />}
      </FormCardBody>
      <FormCardFooter
        redirectMessage="Already have an account?"
        redirectLinkLabel="Login"
        redirectLinkHref="/auth/login"
      />
    </FormCard>
  )
}

const defaultValues: RegisterFormData = { name: '', email: '', password: '' }

const fields: Field[] = [
  { label: 'Name', placeholder: 'Enter your name', type: 'text' },
  { label: 'Email', placeholder: 'Enter your email', type: 'email' },
  { label: 'Password', placeholder: 'Enter your password', type: 'password' },
]

export default RegisterForm
