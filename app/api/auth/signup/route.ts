import { createOtp } from '@/lib/otp'
import { createToken } from '@/lib/token'
import prisma from '@/prisma/client'
import { SignupSchema } from '@/schemas/validation'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = SignupSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { name, email, password } = validation.data

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (user)
    return NextResponse.json(
      { error: 'Email is already in use.' },
      { status: 409 }
    )

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const verificationToken = await createToken(email)
    const otp = await createOtp(email)

    if (verificationToken && otp) {
      const hashedOtp = await bcrypt.hash(otp.code, 10)
      await prisma.oTP.update({
        where: { email },
        data: { code: hashedOtp },
      })

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          oTPId: otp.id,
        },
      })
      return NextResponse.json(
        {
          data: {
            token: verificationToken.token,
            code: otp.code,
          },
          success: 'An OTP has been sent to your email.',
        },
        { status: 201 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Unable to signup! An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
