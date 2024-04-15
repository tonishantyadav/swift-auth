'use client'

import { useVerifyEmail } from '@/hooks/auth/useVerification'
import { handleCredentialsError } from '@/lib/error'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormCardError } from '../FormCard'
import { Button, Spinner } from '../ui'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import ToastContainer from '../ui/toast'

const VerificationCard = () => {
  const params = useSearchParams()
  const router = useRouter()
  const verifyEmail = useVerifyEmail()
  const [token, setToken] = useState('')
  const [error, setError] = useState('')

  const onClick = async () => {
    try {
      if (token) {
        await verifyEmail.mutateAsync(token)
        router.push('/auth/signin')
      }
    } catch (error) {
      const errorMessage = handleCredentialsError(error)
      setError(errorMessage)
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
              {error && <FormCardError message={error} />}
            </CardContent>
            <CardFooter className="mx-2">
              <Button
                className="btn-primary hover:btn-hover w-full rounded-full text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                disabled={!token}
                type="submit"
                onClick={onClick}
              >
                {verifyEmail.isPending ? <Spinner /> : 'Verify'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}

export default VerificationCard
