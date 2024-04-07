import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = VerificationTokenSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(
      { error: 'Token is not provided.' },
      { status: 400 }
    )

  const { token } = validation.data

  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  })

  if (!verificationToken) {
    return NextResponse.json({ error: 'Invalid token.' }, { status: 400 })
  }

  const hasExpired = new Date(verificationToken.expiredAt) < new Date()

  if (hasExpired)
    return NextResponse.json(
      { error: 'Token has been expired.' },
      { status: 401 }
    )

  const user = await prisma.user.findUnique({
    where: { email: verificationToken.email },
  })

  if (!user)
    return NextResponse.json(
      { error: 'Email doesn`t exists.' },
      { status: 404 }
    )

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        email: verificationToken.email,
        emailVerified: new Date(),
      },
    })
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
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

const VerificationTokenSchema = z.object({
  token: z.string(),
})
