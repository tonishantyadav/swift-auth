import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useVerification = () => {
  return useMutation({
    mutationFn: async (token: string) => {
      const response = await axios.post('/api/auth/verification', { token })
      return response.data
    },
  })
}
