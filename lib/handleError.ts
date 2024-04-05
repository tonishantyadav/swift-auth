import axios, { AxiosError } from 'axios'
import { ReadonlyURLSearchParams } from 'next/navigation'

export const handleError = (error: any): string => {
  const err = error as Error | AxiosError
  if (axios.isAxiosError(err)) return err.response?.data.error
  return 'An unexpected error occurred!'
}

export const handleProviderError = (
  params: ReadonlyURLSearchParams
): string => {
  return params.get('error') === 'OAuthAccountNotLinked'
    ? 'Email is already in use with different provider!'
    : ''
}
