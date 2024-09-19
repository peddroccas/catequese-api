import { prisma } from '@/lib/prisma'

interface DeleteCatechistRequest {
  catechistId: string
}

export async function deleteCatechist({ catechistId }: DeleteCatechistRequest) {
  await prisma.catechist.delete({
    where: { id: catechistId },
  })
}
