import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const records = await prisma.user.findMany({
      where: {
        email: null,
      },
    })
    await prisma.user.deleteMany({
      where: {
        id: {
          in: records.map((record) => record.id),
        },
      },
    })
    console.log(`Deleted ${records.length} un-verified email records`)
    return NextResponse.json({ status: 200 })
  } catch (error) {
    console.log('Error deleting expired un-verified email records', error)
    return NextResponse.json({ status: 500 })
  }
}
