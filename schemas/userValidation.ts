import { z } from 'zod'

export const SigninSchema = z.object({
  email: z.string().email('Invalid email.'),
  password: z.string().min(8, 'Invalid password.').max(255, 'Invalid password'),
})

export const SignupSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(255, 'Name is too long'),
  email: z.string().email('Email is required.'),
  password: z
    .string()
    .min(1, 'Password must be at least 8 characters long.')
    .max(255, 'Password is too long.'),
})

export const SendEmailSchema = z.object({
  email: z.string().email(),
  token: z.string(),
})

export const VerificationTokenSchema = z.object({
  token: z.string(),
})

export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, 'Password must be at least 8 characters long.')
    .max(255, 'Password is too long.'),
})
