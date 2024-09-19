import { prisma } from '@/lib/prisma'

interface UpdateCatechizingRequest {
  id: string
  name: string
  address: string
  birthday: Date
  personWithSpecialNeeds: boolean
  hasReceivedBaptism: boolean
  hasReceivedEucharist: boolean
  hasReceivedMarriage: boolean
}

export async function updateCatechizing({
  id,
  name,
  address,
  birthday,
  personWithSpecialNeeds,
  hasReceivedBaptism,
  hasReceivedEucharist,
  hasReceivedMarriage,
}: UpdateCatechizingRequest) {
  const catechizing = await prisma.catechizing.update({
    where: { id },
    data: {
      name,
      address,
      birthday,
      hasReceivedBaptism,
      hasReceivedEucharist,
      hasReceivedMarriage,
      personWithSpecialNeeds,
    },
  })

  return { catechizing }
}
