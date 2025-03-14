import { prisma } from '@/lib/prisma'

export async function updateValueCatechizing() {
  await prisma.payment.updateMany({
    where: {
      catechizing: {
        classroom: {
          startedAt: 2025,
        },
      },
    },
    data: {
      toBePaid: 350,
    },
  })
}
