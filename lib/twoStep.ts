'use server'

import prisma from '@/prisma/client'
import { TwoStep } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

export const createTwoStepCode = async (
  email: string
): Promise<TwoStep | null> => {
  const oldTwoStepToken = await getTwoStepCode(email)

  if (oldTwoStepToken) {
    await prisma.twoStep.delete({
      where: { id: oldTwoStepToken.id },
    })
  }

  const code = uuidv4()
  const expiredAt = new Date(new Date().getTime() + 3600 * 1000) // In one hour

  try {
    const newTwoStepCode = await prisma.twoStep.create({
      data: { email, code, expiredAt },
    })
    return newTwoStepCode
  } catch (error) {
    console.log(
      `Failed to generate the two-step verification token for this ${email}:`,
      error
    )
    return null
  }
}

export const getTwoStepCode = async (
  email: string
): Promise<TwoStep | null> => {
  try {
    return await prisma.twoStep.findFirst({
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

export const deleteTwoStepCode = async (code: string) => {
  try {
    const twoStepCode = await prisma.twoStep.findUnique({
      where: { code },
    })

    if (twoStepCode) {
      await prisma.twoStep.delete({
        where: { id: twoStepCode.id },
      })
    }
  } catch (error) {
    console.log(`Failed to delete the verification token: `, error)
  }
}
