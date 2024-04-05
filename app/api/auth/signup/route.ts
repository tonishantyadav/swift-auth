import { generateVerificationToken } from '@/lib/token'
import prisma from '@/prisma/client'
import { SignupSchema } from '@/schemas/userValidation'
import bcrypt from 'bcrypt'
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
      { error: 'Email already in use!' },
      { status: 409 }
    )

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
    await generateVerificationToken(email)
    return NextResponse.json(
      { success: 'Check your email for the verification!' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to signup! Try again after sometime.' },
      { status: 500 }
    )
  }
}
