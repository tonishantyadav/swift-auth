import { Button, Input } from '@/components/ui'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Field } from '@/types/form'
import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'
import { UseFormReturn } from 'react-hook-form'
import BeatLoader from 'react-spinners/BeatLoader'

const FormCard = ({ children }: { children: React.ReactNode }) => {
  return <Card className="mx-2 lg:container">{children}</Card>
}

const FormCardHeader = ({ header }: { header: string }) => {
  return (
    <CardHeader>
      <h1 className="bg-none text-xl font-semibold md:text-2xl lg:text-3xl">
        {header}
      </h1>
    </CardHeader>
  )
}

const FormCardBody = ({
  children,
  fields,
  form,
}: {
  children: ReactNode
  fields: Field[]
  form: UseFormReturn<any>
}) => {
  return (
    <CardContent className="space-y-5">
      <FormCardFields form={form} fields={fields} />
      {children}
    </CardContent>
  )
}

const FormCardFields = ({
  fields,
  form,
}: {
  fields: Field[]
  form: UseFormReturn<any>
}) => {
  const pathname = usePathname()
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
                <Input
                  type={f.type}
                  placeholder={f.placeholder}
                  {...field}
                  className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                />
              </FormControl>
              <div className="flex items-center justify-between">
                <div>
                  <FormMessage />
                </div>
                {pathname === '/auth/signin' &&
                  f.label.toLowerCase() === 'password' && (
                    <Link
                      href="/auth/forgot/password"
                      className="text-xs text-muted-foreground transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-gray-300 md:text-sm lg:text-sm"
                    >
                      {' '}
                      Forgot password?
                    </Link>
                  )}
              </div>
            </FormItem>
          )}
        />
      ))}
    </>
  )
}

const FormCardFooter = ({
  children,
  message,
  linkLabel,
  linkHref,
}: {
  children?: ReactNode
  message: string
  linkLabel: string
  linkHref: string
}) => {
  return (
    <CardFooter className="flex flex-col gap-y-5">
      {children}
      <div className="flex gap-2 text-xs md:text-sm lg:text-sm">
        <p>{message}</p>
        <Link
          href={linkHref}
          className="text-gray-300 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:underline"
        >
          {linkLabel}
        </Link>
      </div>
    </CardFooter>
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
      className="text-md w-full font-semibold transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting ? <BeatLoader size={10} /> : <span>{label}</span>}
    </Button>
  )
}

const FormCardError = ({ message }: { message: string }) => {
  if (!message) return null
  return (
    <div className="flex items-center justify-center gap-x-2 rounded-lg bg-red-800/100 p-3 text-sm text-red-200/80">
      <ExclamationTriangleIcon className="h-4 w-4" />
      {message}
    </div>
  )
}

const FormCardSuccess = ({ message }: { message: string }) => {
  if (!message) return null
  return (
    <div className="flex items-center justify-center gap-x-2 rounded-lg bg-emerald-500/15 p-3 text-sm text-emerald-500">
      <CheckCircledIcon className="h-4 w-4" />
      {message}
    </div>
  )
}

export {
  FormActionButton,
  FormCard,
  FormCardBody,
  FormCardError,
  FormCardFields,
  FormCardFooter,
  FormCardHeader,
  FormCardSuccess,
}
