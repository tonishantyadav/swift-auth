'use client'

import { Button } from '@/components/ui'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

const AuthErrorPage = () => {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-[size:20px_20px]">
      <Card>
        <CardHeader>
          <p className="text-4xl font-semibold">OAuth Error</p>
        </CardHeader>
        <CardContent>An unexpected error occurred.</CardContent>
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
