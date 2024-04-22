'use client'

import { Button } from '@/components/ui'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const AuthErrorPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState('')

  useEffect(() => {
    if (searchParams.get('error') === 'OAuthAccountNotLinked') {
      setError('Email is already in use with different provider.')
    } else if (searchParams.get('error')) {
      setError('An unexpected error occurred.')
    }
  }, [searchParams])

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-[size:20px_20px]">
      <Card>
        <CardHeader>
          <p className="text-4xl font-semibold">OAuth Error</p>
        </CardHeader>
        {error && (
          <CardContent>
            <p>{error}</p>
          </CardContent>
        )}
        <CardFooter>
          <Button
            className="w-full text-lg font-semibold transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            onClick={() => router.push('/auth/signin')}
          >
            Ok
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AuthErrorPage
