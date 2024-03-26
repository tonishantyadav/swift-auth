import { z } from 'zod'

export const LoginFormSchema = z.object({
  email: z.string().email('Invalid email.'),
  password: z
    .string()
    .min(8, 'Invalid password.')
    .max(255, 'Password is too long.'),
})
