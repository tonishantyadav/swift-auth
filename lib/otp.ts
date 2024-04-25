import prisma from '@/prisma/client'
import { OTP } from '@prisma/client'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

export const getOtp = async (email: string): Promise<OTP | null> => {
  try {
    return await prisma.oTP.findUnique({ where: { email } })
  } catch (error) {
    console.log(`Failed to retrieve the OTP for this ${email}`, error)
    return null
  }
}

export const createOtp = async (email: string): Promise<OTP | null> => {
  const oldOtp = await getOtp(email)

  if (oldOtp) await deleteOtp(oldOtp.code)

  const code = crypto.randomInt(1_00_000, 1_000_000).toString()
  const expiredAt = new Date(new Date().getTime() + 5 * 60 * 1000) // In five minutes

  try {
    return await prisma.oTP.create({
      data: {
        email,
        code,
        expiredAt,
      },
    })
  } catch (error) {
    console.log(`Failed to create a OTP for this ${email}: `, error)
    return null
  }
}

export const deleteOtp = async (email: string) => {
  try {
    const otp = await prisma.oTP.findUnique({ where: { email } })

    if (otp) {
      await prisma.oTP.delete({ where: { id: otp.id } })
    }
  } catch (error) {
    console.log(`Failed to delete the OTP: `, error)
  }
}

export const verifyOtp = async (
  email: string,
  code: string
): Promise<OTP | null> => {
  try {
    const otp = await prisma.oTP.findUnique({
      where: { email },
    })

    if (!otp) return null

    const checkOtp = await bcrypt.compare(code, otp.code)
    if (!checkOtp) return null

    return otp
  } catch (error) {
    console.log('The provided OTP is invalid: ', error)
    return null
  }
}
