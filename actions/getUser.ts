'use server'

import prisma from '@/prisma/client'

export async function getUser(token: string) {
  console.log(token)
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    })
    const user = await prisma.user.findUnique({
      where: { email: verificationToken?.email },
    })
    console.log('verificationToken: ', verificationToken)
    console.log('user: ', user)
    return user
  } catch (error) {
    console.log(`Failed to get the current user details: `, error)
  }
}
