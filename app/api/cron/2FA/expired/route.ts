import prisma from '@/prisma/client'

export async function GET() {
  try {
    const expiredRecords = await prisma.twoFactorAuth.findMany({
      where: {
        expiredAt: {
          lt: new Date(),
        },
      },
    })
    await prisma.twoFactorAuth.deleteMany({
      where: {
        id: {
          in: expiredRecords.map((record) => record.id),
        },
      },
    })
    console.log(`Deleted ${expiredRecords.length} expired 2FA records`)
  } catch (error) {
    console.error('Error deleting expired 2FA records:', error)
  }
}
