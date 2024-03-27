import { FormFields, FormFooter, FormHeader } from '@/app/types/form-card'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Button, Input } from './ui'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'

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

const FormCardBody = ({ form, fields }: FormFields) => {
  return (
    <CardContent>
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
  actionBtnLabel,
  backBtnMessage,
  backBtnLinkLabel,
  backBtnLinkHref,
}: FormFooter) => {
  return (
    <CardFooter className="flex flex-col gap-y-5">
      <Button className="text-md w-full font-semibold" type="submit">
        {actionBtnLabel}
      </Button>
      <span className="text-sm text-gray-300">Or Login with</span>
      <div className="flex gap-3">
        {socialAuths.map((social) => (
          <Button size="icon" className="rounded-full" key={social.label}>
            {social.icon}
          </Button>
        ))}
      </div>
      <div className="flex gap-2 text-xs md:text-sm lg:text-sm">
        <p>{backBtnMessage}</p>
        <Link href={backBtnLinkHref} className="text-gray-300 hover:underline">
          {backBtnLinkLabel}
        </Link>
      </div>
    </CardFooter>
  )
}

const socialAuths: { label: string; icon: React.ReactNode }[] = [
  { label: 'google', icon: <FcGoogle fontSize="1.5rem" /> },
  { label: 'github', icon: <FaGithub fontSize="1.5rem" /> },
]

export { FormCard, FormCardBody, FormCardFooter, FormCardHeader }
