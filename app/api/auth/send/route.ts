import Email from '@/components/Email'
import prisma from '@/prisma/client'
import { EmailSchema } from '@/schemas/userValidation'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = EmailSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    )

  const { email, token } = validation.data

  const verificationLink = `http://localhost:3000/auth/verification?token=${token}`

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user)
    return NextResponse.json({ error: 'User doesn`t exists.' }, { status: 404 })

  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to Next Simple Auth - Complete Your Registration Now!',
      react: Email({ name: user.name!, verificationLink }),
    })

    return Response.json(data)
  } catch (error) {
    return Response.json({ error })
  }
}
