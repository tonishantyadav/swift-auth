import { SigninFormData } from '@/types/form'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export const useSignin = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async (data: SigninFormData) => {
      const response = await axios.post('/api/auth/signin', data)
      return response.data
    },
  })
}
