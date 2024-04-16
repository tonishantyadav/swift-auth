import { generateVerificationToken } from '@/lib/token'
import prisma from '@/prisma/client'
import { PasswordForgotSchema } from '@/schemas/validation'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = request.json()
  const validation = PasswordForgotSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { email } = validation.data

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user)
    return NextResponse.json({ error: 'Invalid user.' }, { status: 404 })

  try {
    const verificationToken = await generateVerificationToken(email)
    return NextResponse.json(
      {
        data: { token: verificationToken?.token },
        success: 'A reset link is been sent to your email.',
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
