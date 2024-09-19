import { prisma } from '@/lib/prisma'

interface GetClassroomByIdRequest {
  classroomId: string
}

export async function getClassroomById({
  classroomId,
}: GetClassroomByIdRequest) {
  const classroom = await prisma.classroom.findUnique({
    where: { id: classroomId },
    select: {
      catechizings: {
        orderBy: { name: 'asc' },
        select: {
          id: true,
          name: true,
          address: true,
          birthday: true,
          classroomId: true,
          hasReceivedBaptism: true,
          hasReceivedEucharist: true,
          hasReceivedMarriage: true,
          personWithSpecialNeeds: true,
          payments: true,
          parents: { select: { name: true, phone: true, kinship: true } },
        },
      },
      id: true,
      segment: true,
      startedAt: true,
      roomNumber: true,
      catechists: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  return { classroom }
}
