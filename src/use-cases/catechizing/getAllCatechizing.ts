import { prisma } from '@/lib/prisma'

export async function getAllCatechizing() {
  const catechizings = await prisma.catechizing.findMany({
    select: {
      id: true,
      name: true,
      address: true,
      birthday: true,
      classroomId: true,
      hasReceivedBaptism: true,
      hasReceivedEucharist: true,
      hasReceivedMarriage: true,
      personWithSpecialNeeds: true,
      payments: true,
      parents: { select: { name: true, phone: true, kinship: true } },
    },
    orderBy: { name: 'asc' },
  })

  return { catechizings }
}
