import { prisma } from '@/lib/prisma'

interface getCatechistRequest {
  id: string
}

export async function getCatechist({ id }: getCatechistRequest) {
  const catechist = await prisma.catechist.findUnique({
    where: { id },
    select: {
      id: true,
      address: true,
      birthday: true,
      classroomId: true,
      name: true,
      phone: true,
      email: true,
      hasReceivedBaptism: true,
      hasReceivedConfirmation: true,
      hasReceivedEucharist: true,
      hasReceivedMarriage: true,
      role: true,
    },
  })

  return { catechist }
}
