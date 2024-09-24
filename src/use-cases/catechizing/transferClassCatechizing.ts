import { prisma } from '@/lib/prisma'

interface TransferClassCatechizingRequest {
  id: string
  classroomId: string
}

export async function transferClassCatechizing({
  id,
  classroomId,
}: TransferClassCatechizingRequest) {
  const catechizing = await prisma.catechizing.update({
    where: { id },
    data: {
      classroomId,
    },
  })

  return { catechizing }
}
