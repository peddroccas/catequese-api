import { prisma } from '@/lib/prisma'

interface UpdateParentRequest {
  catechizingId: string
  parents: {
    name: string
    phone: string
    kinship: string
  }
}

export async function updateParent({
  catechizingId,
  parents,
}: UpdateParentRequest) {
  const { kinship, name, phone } = parents

  const parent = await prisma.parent.update({
    where: { catechizingId },
    data: {
      name,
      kinship,
      phone,
    },
  })

  return { parent }
}
