import { deleteOtp, verifyOtp } from '@/lib/otp'
import { deleteToken } from '@/lib/token'
import prisma from '@/prisma/client'
import { EmailVerifySchema } from '@/schemas/validation'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = EmailVerifySchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(
      { error: 'Token is not provided.' },
      { status: 400 }
    )

  const { token, code } = validation.data

  const verificationToken = await prisma.token.findUnique({
    where: { token },
  })

  if (!verificationToken) {
    return NextResponse.json({ error: 'Invalid token.' }, { status: 400 })
  }

  const hasVerificationTokenExpired =
    new Date(verificationToken.expiredAt) < new Date()

  if (hasVerificationTokenExpired) {
    await deleteToken(token)
    return NextResponse.json(
      { error: 'Token has been expired.' },
      { status: 401 }
    )
  }

  const user = await prisma.user.findUnique({
    where: { email: verificationToken.email },
  })

  if (!user)
    return NextResponse.json(
      { error: 'Email doesn`t exists.' },
      { status: 404 }
    )

  const otp = await verifyOtp(user.email!, code)

  if (!otp) return NextResponse.json({ error: 'Invalid OTP.' }, { status: 404 })

  const hasOtpExired = new Date(otp.expiredAt) < new Date()

  if (hasOtpExired) {
    await deleteToken(token)
    await deleteOtp(user.email!)
    return NextResponse.json(
      { error: 'OTP has been expired.' },
      { status: 404 }
    )
  }

  try {
    await deleteToken(token)
    await deleteOtp(user.email!)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        email: verificationToken.email,
        emailVerified: new Date(),
      },
    })
    return NextResponse.json(
      { success: 'Email is been verified.' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
