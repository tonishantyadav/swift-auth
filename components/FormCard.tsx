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
import { Field, FormBody } from '@/types/formCard'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'
import Spinner from './ui/spinner'

const FormCard = ({ children }: { children: React.ReactNode }) => {
  return <Card className="mx-2 shadow-lg lg:container">{children}</Card>
}

const FormCardHeader = ({ header }: { header: string }) => {
  return (
    <CardHeader>
      <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
        {header}
      </h1>
    </CardHeader>
  )
}

const FormCardBody = ({
  children,
  onSubmit,
  schema,
  fields,
  defaultValues,
}: FormBody) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues },
  })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-5">
          <FormCardFields form={form} fields={fields} />
          {children}
        </CardContent>
      </form>
    </Form>
  )
}

const FormCardFields = ({
  fields,
  form,
}: {
  fields: Field[]
  form: UseFormReturn<any>
}) => {
  return (
    <>
      {fields.map((f, index) => (
        <FormField
          key={index}
          control={form.control}
          name={f.label.toLowerCase()}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{f.label}</FormLabel>
              <FormControl>
                <Input type={f.type} placeholder={f.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  )
}

const FormCardFooter = ({
  message,
  linkLabel,
  linkHref,
}: {
  message: string
  linkLabel: string
  linkHref: string
}) => {
  return (
    <CardFooter className="flex flex-col gap-y-5">
      <span className="text-sm text-gray-300">Or Signin with</span>
      <div className="flex gap-3">
        {socialAuths.map((social) => (
          <Button
            size="icon"
            className="rounded-full"
            key={social.label}
            onClick={() => signIn(social.label.toLowerCase())}
          >
            {social.icon}
          </Button>
        ))}
      </div>
      <div className="flex gap-2 text-xs md:text-sm lg:text-sm">
        <p>{message}</p>
        <Link href={linkHref} className="text-gray-300 hover:underline">
          {linkLabel}
        </Link>
      </div>
    </CardFooter>
  )
}

const FormCardError = ({ message }: { message: string }) => {
  if (!message) return null
  return (
    <div className="flex justify-center gap-x-2 rounded-lg bg-destructive/100 p-3 text-sm text-red-200/80">
      <ExclamationTriangleIcon className="h-4 w-4" />
      {message}
    </div>
  )
}

const FormCardSuccess = ({ message }: { message: string }) => {
  if (!message) return null
  return (
    <div className="mx-6 my-2 flex items-center justify-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
      <CheckCircledIcon className="h-4 w-4" />
      {message}
    </div>
  )
}

const FormActionButton = ({
  label,
  isSubmitting = false,
}: {
  label: string
  isSubmitting?: boolean
}) => {
  return (
    <Button
      className="text-md w-full font-semibold"
      type="submit"
      disabled={isSubmitting}
    >
      <div className="flex gap-2">
        <span>{label}</span>
        {isSubmitting && <Spinner />}
      </div>
    </Button>
  )
}

const socialAuths: { label: string; icon: React.ReactNode }[] = [
  { label: 'google', icon: <FcGoogle fontSize="1.5rem" /> },
  { label: 'github', icon: <FaGithub fontSize="1.5rem" /> },
]

export {
  FormActionButton,
  FormCard,
  FormCardBody,
  FormCardError,
  FormCardFooter,
  FormCardHeader,
  FormCardSuccess,
}
