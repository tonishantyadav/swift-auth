import axios, { AxiosError } from 'axios'

export const handleError = (error: any) => {
  const err = error as Error | AxiosError
  if (axios.isAxiosError(err))
    return err.response?.data.error || 'An unexpected error occurred!'
  return 'An unexpected error occurred!'
}
