import { Button, Input } from '@/components/ui'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FormBody, FormFooter, FormHeader } from '@/types/formCard'

import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import Spinner from './ui/spinner'

const FormCard = ({ children }: { children: React.ReactNode }) => {
  return <Card className="mx-2 max-w-md shadow-md">{children}</Card>
}

const FormCardHeader = ({ formHeader, formDescription }: FormHeader) => {
  return (
    <CardHeader>
      <h1 className="text-2xl md:text-3xl lg:text-3xl">{formHeader}</h1>
      {formDescription && (
        <p className="py-2 text-center text-sm text-gray-400">
          {formDescription}
        </p>
      )}
    </CardHeader>
  )
}

const FormCardBody = ({ form, fields }: FormBody) => {
  return (
    <CardContent className="space-y-2">
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
                  className="max-w-lg"
                  type={f.type}
                  placeholder={f.placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </CardContent>
  )
}

const FormCardFooter = ({
  redirectMessage,
  redirectLinkLabel,
  redirectLinkHref,
  children,
}: FormFooter) => {
  return (
    <CardFooter className="flex flex-col gap-y-5">
      {children}
      <span className="text-sm text-gray-300">Or Login with</span>
      <div className="flex gap-3">
        {socialAuths.map((social) => (
          <Button size="icon" className="rounded-full" key={social.label}>
            {social.icon}
          </Button>
        ))}
      </div>
      <div className="flex gap-2 text-xs md:text-sm lg:text-sm">
        <p>{redirectMessage}</p>
        <Link href={redirectLinkHref} className="text-gray-300 hover:underline">
          {redirectLinkLabel}
        </Link>
      </div>
    </CardFooter>
  )
}

const FormCardError = ({ message }: { message: string }) => {
  if (!message) return null
  return (
    <div className="mx-6 my-2 flex items-center justify-center gap-x-2 rounded-md bg-destructive/50 p-3 text-sm text-red-300">
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
      {label} {isSubmitting && <Spinner />}
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
