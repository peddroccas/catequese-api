import { prisma } from '@/lib/prisma'

export async function getAllCatechists() {
  const catechists = await prisma.catechist.findMany({
    select: {
      id: true,
      address: true,
      birthday: true,
      nickname: true,
      classroomId: true,
      name: true,
      phone: true,
      email: true,
      hasReceivedBaptism: true,
      hasReceivedConfirmation: true,
      hasReceivedEucharist: true,
      hasReceivedMarriage: true,
    },
    orderBy: { name: 'asc' },
  })

  return { catechists }
}
