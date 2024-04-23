import { EmailVerifySchema } from '@/schemas/validation'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

export type EmailVerifyData = z.infer<typeof EmailVerifySchema>

export const useEmailVerify = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async ({ token, code }: EmailVerifyData) => {
      await axios.post('/api/auth/verify/email', {
        token,
        code,
      })
    },
    onSuccess: async () => {
      router.push('/auth/signin')
    },
  })
}
