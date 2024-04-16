import { PasswordResetFormData } from '@/types/form'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

export const usePasswordReset = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async (data: PasswordResetFormData) => {
      await axios.post('/api/auth/reset/password', {
        password: data.password,
        token: data.token,
      })
    },
    onSuccess: () => {
      router.push('/auth/signin')
    },
  })
}
