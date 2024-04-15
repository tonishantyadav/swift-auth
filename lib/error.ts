import axios, { AxiosError } from 'axios'
import { ReadonlyURLSearchParams } from 'next/navigation'

export const handleCredentialsError = (error: any, action?: string): string => {
  const err = error as Error | AxiosError
  if (axios.isAxiosError(err))
    return err.response?.data.error
      ? error.response.data.error
      : action
        ? `Unable to ${action}. An unexpected error occurred!`
        : 'An unexpected error occurred!'
  return 'An unexpected error occurred!'
}

export const handleOAuthError = (params: ReadonlyURLSearchParams) => {
  return params.get('error') === 'OAuthAccountNotLinked'
    ? 'Email is already in use with different provider!'
    : ''
}
