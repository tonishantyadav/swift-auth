'use client'

import { Input } from '@/components/ui'
import { ClientPasswordResetSchema } from '@/schemas/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'

const PasswordResetCard = () => {
  const form = useForm<z.infer<typeof ClientPasswordResetSchema>>({
    resolver: zodResolver(ClientPasswordResetSchema),
  })

  const onSubmit = async (data: { password: string }) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mx-2">
          <CardHeader>
            <p className="text-4xl font-semibold md:text-4xl lg:text-4xl">
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
                    <Input placeholder="Enter your new password" {...field} />
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
