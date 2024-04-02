import { getVerificationToken } from '@/lib/query'
import prisma from '@/prisma/client'
import { VerificationToken } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

export const generateVerificationToken = async (
  email: string
): Promise<VerificationToken | null> => {
  const oldVerificationToken = await getVerificationToken(email)

  try {
    if (oldVerificationToken) {
      await prisma.verificationToken.delete({
        where: { id: oldVerificationToken.id },
      })
    }
  } catch (error) {
    console.log(
      `Failed to delete the old verification token for this ${email}:`,
      error
    )
  }

  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  try {
    const newVerificationToken = await prisma.verificationToken.create({
      data: { email, token, expires },
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
