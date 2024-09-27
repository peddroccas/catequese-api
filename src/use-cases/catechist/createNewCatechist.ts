import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

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
  const password_hash = await hash('123456', 6)
  const catechist = await prisma.catechist.create({
    data: {
      name,
      birthday,
      phone,
      password_hash,
      address,
      email,
      hasReceivedBaptism,
      hasReceivedConfirmation,
      hasReceivedEucharist,
      hasReceivedMarriage,
      classroomId,
    },
  })

  return { catechist }
}
