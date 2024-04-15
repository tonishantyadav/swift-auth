'use client'

import { Button, Input } from '@/components/ui'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useState } from 'react'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-[size:20px_20px]">
      <Card className="mx-2">
        <CardHeader className="ml-1">
          <p className="text-4xl font-semibold md:text-4xl lg:text-4xl">
            Reset Password
          </p>
        </CardHeader>
        <CardContent className="mx-2 max-w-xl space-y-3">
          <p className="lg:text-md text-sm text-slate-200">
            Please enter your email to reset your password.
          </p>
          <Input
            placeholder="Enter your email"
            className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            onChange={(e) => setEmail(e.target.value)}
          />
        </CardContent>
        <CardFooter className="mx-2">
          <Button
            className="btn-primary hover:btn-hover w-full rounded-full text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            type="submit"
            disabled={!email}
          >
            Reset
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ForgotPasswordPage
