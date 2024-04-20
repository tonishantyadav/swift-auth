import Email from '@/components/Email'
import prisma from '@/prisma/client'
import { EmailSchema } from '@/schemas/validation'
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

  const {
    from,
    to: email,
    subject,
    content,
    heading,
    verificationLink,
    verificationCode,
  } = validation.data

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user)
    return NextResponse.json({ error: 'User doesn`t exists.' }, { status: 404 })

  try {
    const data = await resend.emails.send({
      from,
      to: email,
      subject,
      react: Email({
        name: user.name!,
        content,
        heading,
        verificationLink,
        verificationCode,
      }),
    })
    return Response.json(data)
  } catch (error) {
    return Response.json({ error })
  }
}
