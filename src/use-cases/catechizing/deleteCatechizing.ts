import { prisma } from '@/lib/prisma'

interface DeleteCatechizingRequest {
  catechizingId: string
}

export async function deleteCatechizing({
  catechizingId,
}: DeleteCatechizingRequest) {
  const catechizing = await prisma.catechizing.delete({
    where: { id: catechizingId },
  })

  return { catechizing }
}
