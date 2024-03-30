import prisma from '@/prisma/client'
import { RegisterSchema } from '@/schemas/userValidation'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = RegisterSchema.safeParse(body)

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

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return NextResponse.json(newUser)
}
