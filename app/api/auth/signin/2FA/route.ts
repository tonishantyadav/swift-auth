import { delete2FACode, get2FACode } from '@/lib/twoFactorAuth'
import prisma from '@/prisma/client'
import { TwoFactorAuthSchema } from '@/schemas/validation'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = TwoFactorAuthSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { email } = validation.data

  const old2FACode = await get2FACode(email)
  if (old2FACode) {
    const has2FACodeExpired = new Date(old2FACode.expiredAt) < new Date()
    if (has2FACodeExpired) await delete2FACode(email)
    else return NextResponse.json({ status: 200 })
  }

  const code = crypto.randomInt(1_00_000, 1_000_000).toString()
  const expiredAt = new Date(new Date().getTime() + 60 * 60 * 1000) // In one hour
  const hashedCode = await bcrypt.hash(code, 10)

  const new2FACode = await prisma.twoFactorAuth.create({
    data: {
      email,
      code: hashedCode,
      expiredAt,
    },
  })

  if (!new2FACode)
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )

  return NextResponse.json(
    {
      data: {
        code,
        expiredAt,
      },
    },
    { status: 201 }
  )
}
