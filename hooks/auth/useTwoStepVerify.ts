import { createTwoStepCode, getTwoStepCode } from '@/lib/twoStep'
import { SendEmailSchema } from '@/schemas/validation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
import { z } from 'zod'

export const useTwoStepVerify = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (email: string) => {
      let hasExpired = false
      const twoStepCode = await getTwoStepCode(email)

      if (twoStepCode) hasExpired = new Date(twoStepCode.expiredAt) < new Date()

      if (!twoStepCode || hasExpired) {
        const newTwoStepCode = await createTwoStepCode(email)
        if (newTwoStepCode) {
          const sendEmail: z.infer<typeof SendEmailSchema> = {
            from,
            to: newTwoStepCode.email,
            subject,
            content,
            verificationCode: newTwoStepCode.code,
          }
          await axios.post('/api/auth/send', { ...sendEmail })
          toast.success(
            'A 2-step verification code is been sent to your email.'
          )
          queryClient.setQueryData(['open'], true)
        }
      }
    },
  })
}

const from = 'Acme <onboarding@resend.dev>'
const subject = 'Welcome to Swift Auth - Complete Your Registration Now!'
const content = "Here's your 2-step verification code"
