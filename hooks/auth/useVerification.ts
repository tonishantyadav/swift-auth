import { deleteVerificationToken } from '@/actions/deleteVerificationToken'
import { getUser } from '@/actions/getUser'
import { handleError } from '@/lib/handleError'
import { VerificationFormData } from '@/types/form'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export const useVerification = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async (data: VerificationFormData) => {
      const response = await axios.post('/api/auth/verification', {
        token: data.token,
      })
      return response.data
    },
    onSuccess: async (response, data: VerificationFormData) => {
      toast.success(response.success)
      const user = await getUser(data.token)
      try {
        await axios.post('/api/auth/signin', {
          email: user?.email,
          password: data.password,
        })
        await deleteVerificationToken(data.token)
        router.push('/')
      } catch (error) {
        const errorMessage = handleError(error, 'signin')
        toast.error(errorMessage)
        setTimeout(() => {
          router.push('/auth/signin')
        }, 5000)
      }
    },
  })
}
