'use server'

import prisma from '@/prisma/client'
import { Token, TwoStepToken } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

// Operations related to Verification Token
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
      `Failed to generate the verification token for this ${email}:`,
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

// Operations related to two-step verification token
export const createTwoStepToken = async (
  email: string
): Promise<TwoStepToken | null> => {
  const oldTwoStepToken = await getTwoStepToken(email)

  if (oldTwoStepToken) {
    await prisma.twoStepToken.delete({
      where: { id: oldTwoStepToken.id },
    })
  }

  const token = uuidv4()
  const expiredAt = new Date(new Date().getTime() + 3600 * 1000) // In one hour

  try {
    const newTwoStepToken = await prisma.twoStepToken.create({
      data: { email, token, expiredAt },
    })
    return newTwoStepToken
  } catch (error) {
    console.log(
      `Failed to generate the two-step verification token for this ${email}:`,
      error
    )
    return null
  }
}

export const getTwoStepToken = async (
  email: string
): Promise<TwoStepToken | null> => {
  try {
    return await prisma.twoStepToken.findFirst({
      where: { email },
    })
  } catch (error) {
    console.log(
      `Failed to get the two-step verification token for this ${email}`,
      error
    )
    return null
  }
}

export const deleteTwoStepToken = async (token: string) => {
  try {
    const twoStepToken = await prisma.twoStepToken.findUnique({
      where: { token },
    })

    if (twoStepToken) {
      await prisma.twoStepToken.delete({
        where: { id: twoStepToken.id },
      })
    }
  } catch (error) {
    console.log(`Failed to delete the verification token: `, error)
  }
}
