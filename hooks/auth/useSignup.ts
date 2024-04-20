import { EmailSchema } from '@/schemas/validation'
import { SignupFormData } from '@/types/form'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'

export const useSignup = () => {
  return useMutation({
    mutationFn: async (data: Partial<SignupFormData>) => {
      const response = await axios.post('/api/auth/signup', data)
      return response.data
    },
    onSuccess: async (response, data) => {
      if (response) {
        const email = data.email
        const { token } = response.data
        const sendEmail: z.infer<typeof EmailSchema> = {
          from,
          to: email!,
          subject,
          heading,
          content,
          verificationLink: verificationLink + token,
        }
        console.log(sendEmail)
        await axios.post('/api/auth/send', { ...sendEmail })
      }
    },
  })
}

const from = 'Acme <onboarding@resend.dev>'
const subject = 'Email verification'
const heading = 'Welcome to Swift Auth - Complete Your Registration Now!'
const content =
  'Thank you for joining Swift Auth! To complete your registration, Please click the confirmation link below:'
const verificationLink = 'http://localhost:3000/auth/verify/email?token='
