import { prisma } from '@/lib/prisma'

interface DeleteCatechistRequest {
  catechistId: string
}

export async function deleteCatechist({ catechistId }: DeleteCatechistRequest) {
  const deletedCatechist = await prisma.catechist.delete({
    where: { id: catechistId },
  })

  return { deletedCatechist }
}
