import { signIn } from '@/auth'
import prisma from '@/prisma/client'
import { LoginSchema } from '@/schemas/userValidation'
import bcrypt from 'bcrypt'
import { AuthError } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = LoginSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { email, password } = validation.data

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user || !user.password)
    return NextResponse.json({ error: 'User not found!' }, { status: 404 })

  const checkPassowrd = await bcrypt.compare(password, user.password)

  if (!checkPassowrd)
    return NextResponse.json({ error: 'Invalid password!' }, { status: 400 })

  try {
    await signIn('credentials', user)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
          )
      }
    }
    throw error
  }
}
