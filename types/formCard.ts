import { LoginSchema, RegisterSchema } from '@/schemas/userValidation'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export interface Field {
  label: string
  placeholder: string
  type: 'email' | 'password' | 'text'
}

export interface FormHeader {
  formHeader: string
  formDescription?: string
}

export interface FormFooter {
  redirectMessage: string
  redirectLinkLabel: string
  redirectLinkHref: string
}

export interface FormBody {
  children: React.ReactNode
  onSubmit: (data: LoginFormData | RegisterFormData) => Promise<void>
  fields: Field[]
  schema: typeof LoginSchema | typeof RegisterSchema
  defaultValues: LoginFormData | RegisterFormData
}

export interface FormFields {
  fields: Field[]
  form: UseFormReturn<any>
}

export type LoginFormData = z.infer<typeof LoginSchema>
export type RegisterFormData = z.infer<typeof RegisterSchema>
