import prisma from '@/prisma/client'
import { VerificationToken } from '@prisma/client'

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
