import { PasswordResetFormData } from '@/types/form'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export const usePasswordReset = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async (data: PasswordResetFormData) => {
      const response = await axios.post('/api/auth/reset/password', {
        password: data.password,
        token: data.token,
      })
      return response.data
    },
    onSuccess: (response) => {
      toast.success(response.success)
      setTimeout(() => router.push('/auth/signin'), 2000)
    },
    onError: (error: AxiosError) => {
      if (error.response?.status !== 409)
        setTimeout(() => router.push('/auth/signin'), 1000)
    },
  })
}
