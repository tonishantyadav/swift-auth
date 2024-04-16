'use client'

import { Input } from '@/components/ui'
import { PasswordResetSchema } from '@/schemas/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'

const PasswordResetCard = () => {
  const form = useForm<z.infer<typeof PasswordResetSchema>>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: { password: '' },
  })
  const params = useSearchParams()

  const onSubmit = async (data: { password: string }) => {}

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
                  <FormControl>
                    <Input
                      className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                      placeholder="Enter your new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="btn-primary hover:btn-hover w-full rounded-full text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
              type="submit"
            >
              Reset
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default PasswordResetCard
