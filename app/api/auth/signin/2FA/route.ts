import prisma from '@/prisma/client'
import { TwoFactorAuthSchema } from '@/schemas/validation'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = TwoFactorAuthSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { email } = validation.data
  const code = uuidv4()
  const expiredAt = new Date(new Date().getTime() + 3600 * 1000) // In one hour

  const twoFactorAuth = await prisma.twoFactorAuth.create({
    data: {
      email,
      code,
      expiredAt,
    },
  })

  if (!twoFactorAuth)
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )

  await prisma.user.update({
    where: { email },
    data: { twoFactorAuthId: twoFactorAuth.id },
  })

  return NextResponse.json(
    {
      data: {
        code: twoFactorAuth.code,
        expiredAt: twoFactorAuth.expiredAt,
      },
    },
    { status: 201 }
  )
}
