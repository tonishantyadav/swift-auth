import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export const usePasswordForgot = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await axios.post('/api/auth/forgot/password', { email })
      return response.data
    },
    onSuccess: async (response, email) => {
      if (response) {
        toast.success(response.success)
        const { token } = response.data
        await axios.post('/api/auth/reset/send', { email, token })
      }
    },
  })
}
