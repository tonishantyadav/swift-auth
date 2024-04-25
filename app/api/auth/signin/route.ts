import { signIn } from '@/auth'
import { inDevEnvironment } from '@/lib/env'
import { delete2FACode, get2FACode, verify2FACode } from '@/lib/twoFactorAuth'
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

  const { email, password, code } = validation.data

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || !user.password)
    return NextResponse.json({ error: 'Invalid user.' }, { status: 404 })

  const checkPassowrd = await bcrypt.compare(password, user.password)
  if (!checkPassowrd)
    return NextResponse.json({ error: 'Invalid password.' }, { status: 404 })

  // Run as cron job to delete expired 2FA code after 1 sec in dev. environment
  if (inDevEnvironment && user.emailVerified && !code) {
    const is2FACode = await get2FACode(email)
    if (is2FACode) {
      const is2FACodeExpired = new Date(is2FACode.expiredAt) < new Date()
      if (is2FACodeExpired) {
        await delete2FACode(email)
        return NextResponse.json({
          required2FA: true,
        })
      }
    }
  }

  if (!user.twoFactorAuthId && !code && user.emailVerified)
    return NextResponse.json({ required2FA: true })

  if (code) {
    const input2FACode = await verify2FACode(email, code)
    if (!input2FACode) {
      return NextResponse.json({ error: 'Invalid OTP.' }, { status: 404 })
    }

    const hasInput2FACodeExpired = new Date(input2FACode.expiredAt) < new Date()

    if (hasInput2FACodeExpired) {
      await delete2FACode(email)
      return NextResponse.json(
        { error: 'The OTP has been expired.' },
        { status: 404 }
      )
    }
    await prisma.user.update({
      where: { email },
      data: { twoFactorAuthId: input2FACode.id },
    })
  }

  try {
    await signIn('credentials', user)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return NextResponse.json(
            {
              error: 'Invalid credentials.',
            },
            { status: 401 }
          )
        case 'AccessDenied':
          return NextResponse.json(
            {
              error: 'Email is not verified.',
            },
            { status: 401 }
          )
        default:
          return NextResponse.json(
            { error: 'An unexpected error occurred.' },
            { status: 500 }
          )
      }
    }
    throw error
  }
}
