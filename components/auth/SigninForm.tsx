'use client'

import {
  FormActionButton,
  FormCard,
  FormCardBody,
  FormCardError,
  FormCardFooter,
  FormCardHeader,
} from '@/components/FormCard'
import { SocialAuth, TwoStepVerificationDialog } from '@/components/auth'
import { Form } from '@/components/ui/form'
import { useSignin } from '@/hooks/auth/useSignin'
import { handleError } from '@/lib/error'
import { SigninSchema } from '@/schemas/validation'
import { Field, SigninFormData } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const SigninForm = () => {
  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: { ...defaultValues },
  })
  const router = useRouter()
  const signinMutation = useSignin()
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)

  const onSubmit = async (data: SigninFormData) => {
    try {
      await signinMutation.mutateAsync(data)
      router.push('/')
    } catch (error) {
      const errorMessage = handleError(error)
      setError(errorMessage)
    }
  }

  return (
    <>
      {open && <TwoStepVerificationDialog open={open} setOpen={setOpen} />}
      <FormCard>
        <FormCardHeader header="Signin to Your Account" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormCardBody form={form} fields={fields}>
              <FormActionButton
                label="Signin"
                isSubmitting={signinMutation.isPending}
              />
              {error && <FormCardError message={error} />}
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
