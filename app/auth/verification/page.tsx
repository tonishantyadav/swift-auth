'use client'

import { Button, Spinner } from '@/components/ui'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import ToastContainer from '@/components/ui/toast'
import { useVerification } from '@/hooks/auth/useVerification'
import { handleError } from '@/lib/handleError'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const VerificationPage = () => {
  const router = useRouter()
  const params = useSearchParams()
  const verification = useVerification()
  const [token, setToken] = useState('')

  useEffect(() => {
    const token = params.get('token')
    if (token) {
      setToken(token)
    }
  }, [params])

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

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-[size:20px_20px]">
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
      </div>
    </>
  )
}

export default VerificationPage
