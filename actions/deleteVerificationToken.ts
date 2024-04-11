'use server'

import prisma from '@/prisma/client'

export const deleteVerificationToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    })

    if (verificationToken) {
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id },
      })
    }
  } catch (error) {
    console.log(`Failed to delete the verification token: `, error)
  }
}
