import { EmailSchema } from '@/schemas/validation'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'

export const usePasswordForgot = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await axios.post('/api/auth/forgot/password', { email })
      return response.data
    },
    onSuccess: async (response, email) => {
      if (response) {
        const { code } = response.data
        const sendEmail: z.infer<typeof EmailSchema> = {
          from,
          to: email,
          subject,
          heading,
          content,
          verificationCode: code,
        }
        await axios.post('/api/auth/send', { ...sendEmail })
      }
    },
  })
}

const from = 'Swift Auth <mail@tonishantyadav.site>'
const subject = 'Reset Password'
const heading = 'Swift Auth - Reset Password'
const content =
  'To reset your password, below is the OTP code for verification.'
