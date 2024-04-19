'use server'

import prisma from '@/prisma/client'
import { TwoFactorAuth } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

export const create2FACode = async (
  email: string
): Promise<TwoFactorAuth | null> => {
  const old2FACode = await get2FACode(email)

  if (old2FACode) {
    await prisma.twoFactorAuth.delete({
      where: { id: old2FACode.id },
    })
  }

  const code = uuidv4()
  const expiredAt = new Date(new Date().getTime() + 3600 * 1000) // In one hour

  try {
    const new2FACode = await prisma.twoFactorAuth.create({
      data: { email, code, expiredAt },
    })
    return new2FACode
  } catch (error) {
    console.log(`Failed to generate the 2FA code for this ${email}:`, error)
    return null
  }
}

export const get2FACode = async (
  email: string
): Promise<TwoFactorAuth | null> => {
  try {
    return await prisma.twoFactorAuth.findFirst({
      where: { email },
    })
  } catch (error) {
    console.log(`Failed to retrieve the 2FA code for this ${email}`, error)
    return null
  }
}

export const delete2FACode = async (code: string) => {
  try {
    const is2FACode = await prisma.twoFactorAuth.findUnique({
      where: { code },
    })

    if (is2FACode) {
      await prisma.twoFactorAuth.delete({
        where: { id: is2FACode.id },
      })
    }
  } catch (error) {
    console.log(`Failed to delete the 2FA code: `, error)
  }
}

export const verify2FACode = async (
  code: string
): Promise<TwoFactorAuth | null> => {
  try {
    const twoStepCode = await prisma.twoFactorAuth.findUnique({
      where: { code },
    })
    return twoStepCode
  } catch (error) {
    console.log('The provided 2-step code is invalid: ', error)
    return null
  }
}
