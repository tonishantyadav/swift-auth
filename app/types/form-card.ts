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
  actionBtnLabel: string
  backBtnMessage: string
  backBtnLinkLabel: string
  backBtnLinkHref: string
}

export interface FormBody {
  form: UseFormReturn<any>
  fields: Field[]
}
