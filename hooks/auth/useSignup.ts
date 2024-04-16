import { SignupFormData } from '@/types/form'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useSignup = () => {
  return useMutation({
    mutationFn: async (data: Partial<SignupFormData>) => {
      const response = await axios.post('/api/auth/signup', data)
      return response.data
    },
    onSuccess: async (response, data) => {
      if (response) {
        const email = data.email
        const { token } = response.data
        await axios.post('/api/auth/verify/send', { email, token })
      }
    },
  })
}
