import { z } from 'zod'

export const SigninSchema = z.object({
  email: z.string().email('Invalid email.'),
  password: z.string().min(8, 'Invalid password.').max(255, 'Invalid password'),
  code: z.string().min(6, 'Invalid code.').optional(),
})

export const SignupSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(255, 'Name is too long'),
  email: z.string().email('Email is required.'),
  password: z
    .string()
    .min(1, 'Password must be at least 8 characters long.')
    .max(255, 'Password is too long.'),
})

export const EmailSchema = z.object({
  from: z.string(),
  to: z.string().email(),
  subject: z.string(),
  heading: z.string(),
  content: z.string(),
  verificationLink: z.string().optional(),
  verificationCode: z.string().optional(),
})

export const EmailVerifySchema = z.object({
  code: z.string(),
  token: z.string(),
  deleteToken: z.boolean(),
})

export const PasswordForgotSchema = z.object({
  email: z.string().email('Invalid email.'),
})

export const PasswordResetSchema = z.object({
  token: z.string(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(255, 'Password is too long.'),
})

export const PasswordResetInputSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(255, 'Password is too long.'),
  confirmPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(255, 'Password is too long.'),
})

export const TwoFactorAuthSchema = z.object({
  email: z.string().email('Invalid email'),
})

export const InputOTPSchema = z.object({
  code: z.string().min(6, 'Invalid code.'),
})
