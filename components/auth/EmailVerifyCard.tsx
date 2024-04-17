'use client'

import { FormCardError } from '@/components/FormCard'
import { Button } from '@/components/ui'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import ToastContainer from '@/components/ui/toast'
import { useEmailVerify } from '@/hooks/auth/useEmailVerify'
import { handleError } from '@/lib/error'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import BeatLoader from 'react-spinners/BeatLoader'

const EmailVerifyCard = () => {
  const params = useSearchParams()
  const router = useRouter()
  const emailVerify = useEmailVerify()
  const [token, setToken] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const token = params.get('token')
    if (token) {
      setToken(token)
    }
  }, [params])

  const onClick = async () => {
    try {
      if (token) {
        await emailVerify.mutateAsync(token)
      }
    } catch (error) {
      const errorMessage = handleError(error)
      setError(errorMessage)
    }
  }

  return (
    <>
      <ToastContainer />
      <div>
        <div className="container">
          <Card>
            <CardHeader className="ml-1">
              <p className="text-4xl font-semibold md:text-4xl lg:text-4xl">
                Verify Email
              </p>
            </CardHeader>
            <CardContent className="mx-2 max-w-xl space-y-3">
              <p className="text-gray-300">
                To complete your registration, Please verify your email by
                clicking the button below.
              </p>
              {error && <FormCardError message={error} />}
            </CardContent>
            <CardFooter className="mx-2">
              <Button
                className="btn-primary hover:btn-hover text-md w-full font-semibold text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                disabled={!token}
                type="submit"
                onClick={onClick}
              >
                {emailVerify.isPending ? (
                  <BeatLoader color="white" size={10} />
                ) : (
                  'Verify'
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}

export default EmailVerifyCard
