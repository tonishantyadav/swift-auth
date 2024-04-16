import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await axios.post('/api/auth/forgot/password', { email })
      return response.data
    },
    onSuccess: async (response, email) => {
      if (response) {
        const { token } = response.data
        await axios.post('/api/auth/reset/send', { email, token })
      }
    },
  })
}
