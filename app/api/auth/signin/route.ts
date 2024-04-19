import { signIn } from '@/auth'
import prisma from '@/prisma/client'
import { SigninSchema } from '@/schemas/validation'
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = SigninSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { email, password } = validation.data

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || !user.password)
    return NextResponse.json({ error: 'Invalid user.' }, { status: 404 })

  const checkPassowrd = await bcrypt.compare(password, user.password)
  if (!checkPassowrd)
    return NextResponse.json({ error: 'Invalid password.' }, { status: 404 })

  if (!user.twoFactorAuthId) return NextResponse.json({ required2FA: true })

  try {
    await signIn('credentials', user)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return NextResponse.json(
            {
              error:
                'Unable to signin! Check your credentials or try again after sometime.',
            },
            { status: 401 }
          )
        case 'AccessDenied':
          return NextResponse.json(
            {
              error: 'Unable to signin! Email is not verified.',
            },
            { status: 401 }
          )
        default:
          return NextResponse.json(
            { error: 'Unable to signin! An unexpected error occurred.' },
            { status: 500 }
          )
      }
    }
    throw error
  }
}
