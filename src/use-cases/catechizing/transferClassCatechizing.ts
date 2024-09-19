import { prisma } from '@/lib/prisma'

interface TransferClassCatechizingRequest {
  id: string
  newClassroomId: string
}

export async function transferClassCatechizing({
  id,
  newClassroomId,
}: TransferClassCatechizingRequest) {
  const catechizing = await prisma.catechizing.update({
    where: { id },
    data: {
      classroomId: newClassroomId,
    },
  })

  return { catechizing }
}
