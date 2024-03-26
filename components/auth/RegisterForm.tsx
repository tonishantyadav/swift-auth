'use client'

import { RegisterFormSchema } from '@/app/schemas'
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
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'

type LoginFormData = z.infer<typeof RegisterFormSchema>

const RegisterForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginFormData) => {}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mx-2 max-w-md shadow-md">
          <CardHeader className="text-2xl md:text-3xl lg:text-3xl">
            Register a new account
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="max-w-lg"
                      type="text"
                      placeholder="Enter your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="max-w-lg"
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="max-w-lg"
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-y-5">
            <Button className="text-md w-full font-semibold" type="submit">
              Login
            </Button>
            <span className="text-sm text-gray-300">Or Register with</span>
            <div className="flex gap-3">
              {socialAuths.map((s) => (
                <Button size="icon" className="rounded-full" key={s.label}>
                  {s.icon}
                </Button>
              ))}
            </div>
            <div className="flex gap-2 text-xs md:text-sm lg:text-sm">
              <p>Already have an account?</p>
              <Link href="" className="text-gray-300 hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

const socialAuths: { label: string; icon: React.ReactNode }[] = [
  { label: 'google', icon: <FcGoogle fontSize="1.5rem" /> },
  { label: 'github', icon: <FaGithub fontSize="1.5rem" /> },
]

export default RegisterForm
