import { EmailSchema } from '@/schemas/validation'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
import { z } from 'zod'

export const useTwoFactorAuth = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await axios.post('/api/auth/signin/2FA', { email })
      return response.data
    },
    onSuccess: async (response, email) => {
      if (response && response.data) {
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
        toast.success('A verification code has been sent to your email.')
      }
    },
  })
}

const from = 'mail@tonishantyadav.site'
const subject = '2FA Verification'
const heading = 'Swift Auth - 2FA Verification'
const content = "Here's your 2FA verification code:"
