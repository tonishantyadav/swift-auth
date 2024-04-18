import { createToken } from '@/lib/token'
import prisma from '@/prisma/client'
import { PasswordForgotSchema } from '@/schemas/validation'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = PasswordForgotSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { email } = validation.data

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user)
    return NextResponse.json({ error: 'Invalid user' }, { status: 404 })

  if (!user.emailVerified)
    return NextResponse.json(
      { error: 'Email is not verified.' },
      { status: 404 }
    )

  const isVerificationToken = await prisma.token.findFirst({
    where: { email },
  })

  if (isVerificationToken) {
    const hasExpired = new Date(isVerificationToken.expiredAt) < new Date()

    if (!hasExpired) {
      return NextResponse.json(
        { error: 'Password reset link is already been sent to your email.' },
        { status: 409 }
      )
    }
  }

  try {
    const verificationToken = await createToken(email)
    return NextResponse.json(
      {
        data: { token: verificationToken?.token },
        success: 'Password reset link is been sent to your email.',
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error is occurred.' },
      { status: 500 }
    )
  }
}
