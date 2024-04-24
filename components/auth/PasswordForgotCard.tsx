'use client'

import { FormCardError } from '@/components/FormCard'
import { InputOTPDialog } from '@/components/auth'
import { Button, Input } from '@/components/ui'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import ToastContainer from '@/components/ui/toast'
import { usePasswordForgot } from '@/hooks/auth/usePasswordForgot'
import { handleError } from '@/lib/error'
import { PasswordForgotSchema } from '@/schemas/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import BeatLoader from 'react-spinners/BeatLoader'
import { z } from 'zod'

const PasswordForgotCard = () => {
  const form = useForm<z.infer<typeof PasswordForgotSchema>>({
    resolver: zodResolver(PasswordForgotSchema),
    defaultValues: { email: '' },
  })
  const passwordForgot = usePasswordForgot()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    if (passwordForgot.isSuccess) setOpen(true)
  }, [passwordForgot.isSuccess])

  const onSubmit = async ({ email }: { email: string }) => {
    try {
      const response = await passwordForgot.mutateAsync(email)
      if (response && response.data) setToken(response.data.token)
    } catch (error) {
      const errorMessage = handleError(error)
      setError(errorMessage)
    }
    form.reset()
  }

  return (
    <>
      {open && <InputOTPDialog open={open} setOpen={setOpen} token={token} />}
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
                <FormLabel>Enter your email to reset your password.</FormLabel>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
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
                  className="text-md w-full font-semibold transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                  type="submit"
                  disabled={passwordForgot.isPending}
                >
                  {passwordForgot.isPending ? (
                    <BeatLoader size={10} />
                  ) : (
                    'Submit'
                  )}
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
