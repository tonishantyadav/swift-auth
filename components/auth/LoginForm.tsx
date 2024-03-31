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
import { LoginSchema } from '@/schemas/userValidation'
import { Field, LoginFormData } from '@/types/formCard'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const LoginForm = () => {
  const router = useRouter()
  const [error, setError] = useState('')

  const onSubmit = async (data: LoginFormData) => {
    try {
      await axios.post('/api/auth/login', data)
      router.push('/')
    } catch (error) {
      const err = handleError(error)
      setError(err)
    }
  }

  return (
    <FormCard>
      <FormCardHeader formHeader="Login to your account" />
      <FormCardBody
        onSubmit={onSubmit}
        fields={fields}
        schema={LoginSchema}
        defaultValues={defaultValues}
      >
        <FormActionButton label="Login" />
        {error && <FormCardError message={error} />}
      </FormCardBody>
      <FormCardFooter
        redirectMessage="Don't have an account?"
        redirectLinkLabel="Register"
        redirectLinkHref="/auth/register"
      />
    </FormCard>
  )
}

const defaultValues: LoginFormData = {
  email: '',
  password: '',
}

const fields: Field[] = [
  { label: 'Email', placeholder: 'Enter your email', type: 'email' },
  { label: 'Password', placeholder: 'Enter your password', type: 'password' },
]

export default LoginForm
