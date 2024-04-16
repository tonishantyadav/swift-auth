import { deleteVerificationToken } from '@/actions/deleteVerificationToken'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useEmailVerify = () => {
  return useMutation({
    mutationFn: async (token: string) => {
      await axios.post('/api/auth/verify/email', {
        token,
      })
    },
    onSuccess: async (_, token: string) => {
      await deleteVerificationToken(token)
    },
  })
}
