import prisma from '@/prisma/client'
import { TwoFactorAuth } from '@prisma/client'
import bcrypt from 'bcryptjs'

export const get2FACode = async (
  email: string
): Promise<TwoFactorAuth | null> => {
  try {
    return await prisma.twoFactorAuth.findUnique({
      where: { email },
    })
  } catch (error) {
    console.log(`Failed to retrieve the 2FA code for this ${email}`, error)
    return null
  }
}

export const delete2FACode = async (email: string) => {
  try {
    const is2FACode = await prisma.twoFactorAuth.findUnique({
      where: { email },
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
  email: string,
  code: string
): Promise<TwoFactorAuth | null> => {
  try {
    const is2FACode = await prisma.twoFactorAuth.findUnique({
      where: { email },
    })

    if (!is2FACode) return null

    const check2FACode = await bcrypt.compare(code, is2FACode.code)
    if (!check2FACode) return null

    return is2FACode
  } catch (error) {
    console.log('The provided 2FA code is invalid: ', error)
    return null
  }
}
