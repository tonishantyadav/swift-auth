import { EmailSchema } from '@/schemas/validation'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'

export const useTwoFactorAuth = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await axios.post('/api/auth/signin/2FA', { email })
      return response.data
    },
    onSuccess: async (response, email) => {
      const { code } = response.data
      const sendEmail: z.infer<typeof EmailSchema> = {
        from,
        to: email,
        subject,
        content,
        verificationCode: code,
      }
      await axios.post('/api/auth/send', { ...sendEmail })
    },
  })
}

const from = 'Acme <onboarding@resend.dev>'
const subject = 'Swift Auth - 2FA Verification'
const content = "Here's your 2FA verification code"
