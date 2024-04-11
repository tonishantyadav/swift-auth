import { SignupFormData } from '@/types/form'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useSignup = () => {
  return useMutation({
    mutationFn: async (data: Partial<SignupFormData>) => {
      const response = await axios.post('/api/auth/signup', data)
      return response.data
    },
    onSuccess: async (response) => {
      if (response) {
        const { email, token } = response.data
        await axios.post('/api/auth/send', { email, token })
      }
    },
  })
}
