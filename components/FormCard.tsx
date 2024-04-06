import { Button, Input, Spinner } from '@/components/ui'
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
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { z } from 'zod'

const FormCard = ({ children }: { children: React.ReactNode }) => {
  return <Card className="mx-2 lg:container">{children}</Card>
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
                <Input
                  type={f.type}
                  placeholder={f.placeholder}
                  {...field}
                  className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                />
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
  children,
  message,
  linkLabel,
  linkHref,
}: {
  children: ReactNode
  message: string
  linkLabel: string
  linkHref: string
}) => {
  return (
    <CardFooter className="flex flex-col gap-y-5">
      {children}
      <div className="flex gap-2 text-xs md:text-sm lg:text-sm">
        <p>{message}</p>
        <Link href={linkHref} className="text-gray-300 hover:underline">
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
      <div className="flex gap-2">
        <span>{label}</span>
        {isSubmitting && <Spinner />}
      </div>
    </Button>
  )
}

export {
  FormActionButton,
  FormCard,
  FormCardBody,
  FormCardFooter,
  FormCardHeader,
}
