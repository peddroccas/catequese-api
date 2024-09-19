import { prisma } from '@/lib/prisma'

interface CreateNewCatechizingRequest {
  name: string
  address: string
  birthday: Date
  classroomId: string
  personWithSpecialNeeds: boolean
  hasReceivedBaptism: boolean
  hasReceivedEucharist: boolean
  hasReceivedMarriage: boolean
  parents: {
    name: string
    phone: string
    kinship: string
  }
}

export async function createNewCatechizing({
  address,
  birthday,
  classroomId,
  hasReceivedBaptism,
  hasReceivedEucharist,
  hasReceivedMarriage,
  name,
  parents,
  personWithSpecialNeeds,
}: CreateNewCatechizingRequest) {
  const catechizing = await prisma.catechizing.create({
    data: {
      name,
      address,
      birthday,
      hasReceivedBaptism,
      hasReceivedEucharist,
      hasReceivedMarriage,
      personWithSpecialNeeds,
      classroomId,
      parents: {
        create: {
          name: parents.name,
          phone: parents.phone,
          kinship: parents.kinship,
        },
      },
      payments: {
        create: {
          toBePaid:
            (await prisma.classroom
              .findFirst({
                select: { startedAt: true },
                where: { id: classroomId },
              })
              .then((startedAt) => startedAt?.startedAt)) === 2023
              ? 150
              : 250,
        },
      },
    },
  })

  return { catechizing }
}
