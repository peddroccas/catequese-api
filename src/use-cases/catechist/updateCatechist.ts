import { prisma } from '@/lib/prisma'

interface UpdateCatechistRequest {
  catechistId: string
  name: string
  address: string
  email: string
  birthday: Date
  phone: string
  hasReceivedBaptism: boolean
  hasReceivedEucharist: boolean
  hasReceivedMarriage: boolean
}

export async function updateCatechist({
  name,
  birthday,
  address,
  catechistId,
  email,
  hasReceivedBaptism,
  hasReceivedEucharist,
  hasReceivedMarriage,
  phone,
}: UpdateCatechistRequest) {
  const catechist = await prisma.catechist.update({
    where: { id: catechistId },
    data: {
      name,
      address,
      email,
      birthday,
      phone,
      hasReceivedBaptism,
      hasReceivedEucharist,
      hasReceivedMarriage,
    },
  })
  return { catechist }
}
