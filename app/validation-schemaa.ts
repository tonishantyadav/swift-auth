import { z } from 'zod'

export const LoginFormSchema = z.object({
  email: z.string().email('Invalid email.'),
  password: z.string().min(8, 'Invalid password.').max(255, 'Invalid password'),
})

export const RegisterFormSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(255, 'Name is too long'),
  email: z.string().email('Email is required.'),
  password: z
    .string()
    .min(1, 'Password must be at least 8 characters long.')
    .max(255, 'Password is too long.'),
})
