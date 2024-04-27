import { EmailVerifySchema } from '@/schemas/validation'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'

export type EmailVerifyData = z.infer<typeof EmailVerifySchema>

export const useEmailVerify = () => {
  return useMutation({
    mutationFn: async ({ code, token, deleteToken }: EmailVerifyData) => {
      await axios.post('/api/auth/verify/email', {
        code,
        token,
        deleteToken,
      })
    },
  })
}
