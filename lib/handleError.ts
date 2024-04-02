import axios, { AxiosError } from 'axios'
import { ReadonlyURLSearchParams } from 'next/navigation'

export const handleError = (error: any) => {
  const err = error as Error | AxiosError
  if (axios.isAxiosError(err))
    return err.response?.data.error || 'An unexpected error occurred!'
  return 'An unexpected error occurred!'
}

export const handleProviderError = (params: ReadonlyURLSearchParams) => {
  return params.get('error') === 'OAuthAccountNotLinked'
    ? 'Email is already in use with different provider!'
    : ''
}
