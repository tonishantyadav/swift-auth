import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const records = await prisma.twoFactorAuth.findMany({
      where: {
        expiredAt: {
          lt: new Date(),
        },
      },
    })
    await prisma.twoFactorAuth.deleteMany({
      where: {
        id: {
          in: records.map((record) => record.id),
        },
      },
    })
    console.log(`Deleted ${records.length} expired 2FA records`)
    return NextResponse.json({ status: 200 })
  } catch (error) {
    console.error('Error deleting expired 2FA records:', error)
    return NextResponse.json({ status: 500 })
  }
}
