import { EmailSchema } from '@/schemas/validation'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { z } from 'zod'

export const usePasswordForgot = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await axios.post('/api/auth/forgot/password', { email })
      return response.data
    },
    onSuccess: async (response, email) => {
      if (response) {
        const { token } = response.data
        const sendEmail: z.infer<typeof EmailSchema> = {
          from,
          to: email,
          subject,
          content,
          verificationLink: verificationLink + token,
        }
        toast.success(response.success)
        await axios.post('/api/auth/send', { ...sendEmail })
      }
    },
  })
}

const from = 'Acme <onboarding@resend.dev>'
const subject = 'Swift Auth - Reset Password!'
const content = 'To reset your password, Please click the link below:'
const verificationLink = 'http://localhost:3000/auth/reset/password?token='
