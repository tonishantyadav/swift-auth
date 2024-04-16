import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export const useEmailVerify = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async (token: string) => {
      await axios.post('/api/auth/verify/email', {
        token,
      })
    },
    onSuccess: async (_, token: string) => {
      router.push('/auth/signin')
    },
  })
}
