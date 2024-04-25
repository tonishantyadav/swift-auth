import { createOtp } from '@/lib/otp'
import { createToken } from '@/lib/token'
import prisma from '@/prisma/client'
import { PasswordForgotSchema } from '@/schemas/validation'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = PasswordForgotSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { email } = validation.data

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user)
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 404 })

  if (!user.emailVerified)
    return NextResponse.json(
      { error: 'Email is not verified.' },
      { status: 404 }
    )

  try {
    const otp = await createOtp(email)
    const verificationToken = await createToken(email)

    if (otp && verificationToken) {
      const hashedOtp = await bcrypt.hash(otp.code, 10)
      await prisma.oTP.update({
        where: { email },
        data: { code: hashedOtp },
      })

      return NextResponse.json(
        {
          data: {
            code: otp.code,
            token: verificationToken.token,
          },
          success: 'An OTP is been sent to your email.',
        },
        { status: 201 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error is occurred.' },
      { status: 500 }
    )
  }
}
