import prisma from '@/prisma/client'
import { VerificationToken } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

export const generateVerificationToken = async (
  email: string
): Promise<VerificationToken | null> => {
  const oldVerificationToken = await getVerificationToken(email)

  if (oldVerificationToken) {
    await prisma.verificationToken.delete({
      where: { id: oldVerificationToken.id },
    })
  }

  const token = uuidv4()
  const expiredAt = new Date(new Date().getTime() + 3600 * 1000) // In one hour

  try {
    const newVerificationToken = await prisma.verificationToken.create({
      data: { email, token, expiredAt },
    })
    return newVerificationToken
  } catch (error) {
    console.log(
      `Failed to generate the verification token for this ${email}:`,
      error
    )
    return null
  }
}

export const getVerificationToken = async (
  email: string
): Promise<VerificationToken | null> => {
  try {
    return await prisma.verificationToken.findFirst({ where: { email } })
  } catch (error) {
    console.log(
      `Failed to get the verification token for this ${email}:`,
      error
    )
    return null
  }
}
