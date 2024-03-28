import React from 'react'
import { UseFormReturn } from 'react-hook-form'

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
  children: React.ReactNode
}

export interface FormBody {
  form: UseFormReturn<any>
  fields: Field[]
}
