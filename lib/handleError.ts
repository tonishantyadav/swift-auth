import axios, { AxiosError } from 'axios'

export const handleError = (error: any): string => {
  const err = error as Error | AxiosError
  if (axios.isAxiosError(err)) return err.response?.data.error
  return 'An unexpected error occurred!'
}
