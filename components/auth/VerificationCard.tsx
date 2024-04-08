'use client'

import { useVerification } from '@/hooks/auth/useVerification'
import { handleError } from '@/lib/handleError'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Spinner } from '../ui'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import ToastContainer from '../ui/toast'

const VerificationCard = () => {
  const params = useSearchParams()
  const router = useRouter()
  const verification = useVerification()
  const [token, setToken] = useState('')

  const onclick = async () => {
    try {
      if (token) {
        await verification.mutateAsync(token)
        router.push('/auth/signin')
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
          <Card>
            <CardHeader>
              <p className="text-4xl font-semibold md:text-4xl lg:text-4xl">
                Verification
              </p>
            </CardHeader>
            <CardContent className="max-w-lg">
              <p className=" pl-2 text-slate-200">
                Welcome to Swift Auth! To complete your registration, Please
                verify your email by clicking the button below.
              </p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                className="btn-primary hover:btn-hover rounded-full text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                onClick={onclick}
                disabled={!token}
              >
                {verification.isPending ? <Spinner /> : 'Verify'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}

export default VerificationCard
