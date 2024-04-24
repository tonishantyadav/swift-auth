'use server'

import prisma from '@/prisma/client'
import { Token } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

export const createToken = async (email: string): Promise<Token | null> => {
  const oldToken = await getToken(email)

  if (oldToken) {
    await prisma.token.delete({
      where: { id: oldToken.id },
    })
  }

  const token = uuidv4()
  const expiredAt = new Date(new Date().getTime() + 3600 * 1000) // In one hour

  try {
    const newToken = await prisma.token.create({
      data: { email, token, expiredAt },
    })
    return newToken
  } catch (error) {
    console.log(
      `Failed to create the verification token for this ${email}:`,
      error
    )
    return null
  }
}

export const getToken = async (email: string): Promise<Token | null> => {
  try {
    return await prisma.token.findFirst({ where: { email } })
  } catch (error) {
    console.log(
      `Failed to get the verification token for this ${email}:`,
      error
    )
    return null
  }
}

export const deleteToken = async (token: string) => {
  try {
    const verificationToken = await prisma.token.findUnique({
      where: { token },
    })

    if (verificationToken) {
      await prisma.token.delete({
        where: { id: verificationToken.id },
      })
    }
  } catch (error) {
    console.log(`Failed to delete the verification token: `, error)
  }
}
