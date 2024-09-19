import { prisma } from '@/lib/prisma'

interface TransferClassCatechistRequest {
  id: string
  classroomId: string
}

export async function transferClassCatechist({
  id,
  classroomId,
}: TransferClassCatechistRequest) {
  const catechist = await prisma.catechist.update({
    where: { id },
    data: { classroomId },
  })

  return { catechist }
}
