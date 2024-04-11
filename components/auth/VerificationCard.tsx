'use client'

import { useVerification } from '@/hooks/auth/useVerification'
import { handleError } from '@/lib/handleError'
import { VerificationSchema } from '@/schemas/userValidation'
import { Field } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { FormCardFields } from '../FormCard'
import { Button, Spinner } from '../ui'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Form } from '../ui/form'
import ToastContainer from '../ui/toast'

const VerificationCard = () => {
  const params = useSearchParams()
  const router = useRouter()
  const verification = useVerification()
  const [token, setToken] = useState('')

  const form = useForm<z.infer<typeof VerificationSchema>>({
    resolver: zodResolver(VerificationSchema),
    defaultValues: {
      token: token,
      password: '',
    },
  })

  const onSubmit = async ({ password }: { password: string }) => {
    try {
      if (token) {
        await verification.mutateAsync({
          token,
          password: password,
        })
      }
    } catch (error) {
      const errorMessage = handleError(error)
      toast.error(errorMessage)
    }
  }

  useEffect(() => {
    const token = params.get('token')
    if (token) {
      setToken(token)
    }
  }, [params])

  return (
    <>
      <ToastContainer />
      <div>
        <div className="container">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card>
                <CardHeader className="ml-1">
                  <p className="text-4xl font-semibold md:text-4xl lg:text-4xl">
                    Verification
                  </p>
                </CardHeader>
                <CardContent className="mx-2 max-w-xl space-y-3">
                  <p className="text-slate-200">
                    To complete your registration, Please verify your email by
                    entering the password and clicking the button below.
                  </p>
                  <FormCardFields form={form} fields={fields} />
                </CardContent>
                <CardFooter className="mx-2">
                  <Button
                    className="btn-primary hover:btn-hover w-full rounded-full text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                    disabled={!token}
                    type="submit"
                  >
                    {verification.isPending ? <Spinner /> : 'Verify'}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

const fields: Field[] = [
  { label: 'Password', placeholder: 'Enter your password', type: 'password' },
]

export default VerificationCard
