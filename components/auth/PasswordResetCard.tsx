'use client'

import { Input, Spinner } from '@/components/ui'
import { usePasswordReset } from '@/hooks/auth/usePasswordReset'
import { handleError } from '@/lib/error'
import { PasswordResetInputSchema } from '@/schemas/validation'
import { Field } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormCardError } from '../FormCard'
import { Button } from '../ui'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'

const PasswordResetCard = () => {
  const form = useForm<z.infer<typeof PasswordResetInputSchema>>({
    resolver: zodResolver(PasswordResetInputSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })
  const params = useSearchParams()
  const router = useRouter()
  const passwordReset = usePasswordReset()
  const [token, setToken] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const token = params.get('token')
    if (token) {
      setToken(token)
    }
  }, [params])

  const onSubmit = async ({
    password,
    confirmPassword,
  }: {
    password: string
    confirmPassword: string
  }) => {
    let isPasswordConfirmed = false
    try {
      if (confirmPassword !== password) {
        setError("Password doesn't match.")
        form.reset()
        throw new Error()
      }
      isPasswordConfirmed = true
      await passwordReset.mutateAsync({ token, password })
    } catch (error) {
      if (isPasswordConfirmed) {
        const errorMessage = handleError(error)
        setError(errorMessage)
      }
    }
    if (isPasswordConfirmed) setTimeout(() => router.push('/auth/signin'), 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mx-2">
          <CardHeader>
            <p className="text-4xl font-semibold md:text-5xl lg:text-5xl">
              Reset Password
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="lg:text-md text-sm text-slate-200">
              Please enter your new password.
            </p>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                      placeholder="Type your new password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                      placeholder="Re-type your new password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <FormCardError message={error} />}
          </CardContent>
          <CardFooter>
            <Button
              className="btn-primary hover:btn-hover w-full rounded-full text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
              type="submit"
              disabled={!token || passwordReset.isPending}
            >
              {passwordReset.isPending ? <Spinner /> : 'Reset'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

const fields: Field[] = [
  {
    label: 'Password',
    placeholder: 'Type your new password',
    type: 'password',
  },
  {
    label: 'Confirm Password',
    placeholder: 'Re-type your new password',
    type: 'password',
  },
]

export default PasswordResetCard
