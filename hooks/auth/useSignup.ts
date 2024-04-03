import { SignupFormData } from '@/types/formCard'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useSignup = () => {
  return useMutation({
    mutationFn: async (data: Partial<SignupFormData>) =>
      await axios.post('/api/auth/signup', data),
    onSuccess: async (_, data: Partial<SignupFormData>) => {
      await axios.post('/api/auth/signin', {
        email: data.email,
        password: data.password,
      })
    },
  })
}
