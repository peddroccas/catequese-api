import { prisma } from '@/lib/prisma'

interface CreateNewCatechistRequest {
  name: string
  birthday: Date
  phone: string
  address: string
  email: string
  hasReceivedBaptism: boolean
  hasReceivedConfirmation: boolean
  hasReceivedEucharist: boolean
  hasReceivedMarriage: boolean
  classroomId?: string
}

export async function createNewCatechist({
  name,
  birthday,
  address,
  phone,
  email,
  hasReceivedBaptism,
  hasReceivedConfirmation,
  hasReceivedEucharist,
  hasReceivedMarriage,
  classroomId,
}: CreateNewCatechistRequest) {
  const newCatechist = await prisma.catechist.create({
    data: {
      name,
      birthday,
      phone,
      address,
      email,
      hasReceivedBaptism,
      hasReceivedConfirmation,
      hasReceivedEucharist,
      hasReceivedMarriage,
      classroomId,
    },
  })

  return { newCatechist }
}
