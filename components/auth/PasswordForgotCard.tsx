'use client'

import { Button, Input, Spinner } from '@/components/ui'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { usePasswordForgot } from '@/hooks/auth/usePasswordForgot'
import { handleError } from '@/lib/error'
import { PasswordForgotSchema } from '@/schemas/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormCardError } from '../FormCard'
import ToastContainer from '../ui/toast'

const PasswordForgotCard = () => {
  const form = useForm<z.infer<typeof PasswordForgotSchema>>({
    resolver: zodResolver(PasswordForgotSchema),
    defaultValues: { email: '' },
  })
  const router = useRouter()
  const passwordForgot = usePasswordForgot()
  const [error, setError] = useState('')

  const onSubmit = async ({ email }: { email: string }) => {
    try {
      await passwordForgot.mutateAsync(email)
      form.reset()
    } catch (error) {
      const errorMessage = handleError(error)
      setError(errorMessage)
    }
  }

  if (passwordForgot.isSuccess || passwordForgot.isError) {
    setTimeout(() => router.push('/auth/signin'), 3000)
  }

  return (
    <>
      <ToastContainer />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-[size:20px_20px]">
            <Card className="mx-2">
              <CardHeader className="ml-1">
                <p className="text-4xl font-semibold md:text-5xl lg:text-5xl">
                  Forgot Password
                </p>
              </CardHeader>
              <CardContent className="mx-2 max-w-xl space-y-3">
                <p className="lg:text-md text-sm text-slate-200">
                  Please enter your email to reset your password.
                </p>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && <FormCardError message={error} />}
              </CardContent>
              <CardFooter className="mx-2">
                <Button
                  className="btn-primary hover:btn-hover w-full rounded-full text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                  type="submit"
                  disabled={passwordForgot.isPending}
                >
                  {passwordForgot.isPending ? <Spinner /> : 'Submit'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </Form>
    </>
  )
}

export default PasswordForgotCard
