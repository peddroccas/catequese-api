import { prisma } from '@/lib/prisma'

interface GetCatechizingByClassroomRequest {
  classroomId: string
}

export async function getCatechizingByClassroom({
  classroomId,
}: GetCatechizingByClassroomRequest) {
  const catechizings = await prisma.catechizing
    .findMany({
      where: { classroom: { id: classroomId } },
      select: {
        id: true,
        name: true,
        address: true,
        birthday: true,
        classroomId: true,
        hasReceivedBaptism: true,
        hasReceivedEucharist: true,
        hasReceivedMarriage: true,
        payments: true,
        parents: { select: { name: true, phone: true, kinship: true } },
      },
      orderBy: { name: 'asc' },
    })
    .then((catechizings) =>
      catechizings.map((catechizing) => {
        return { ...catechizing, parents: catechizing.parents[0] }
      }),
    )

  return { catechizings }
}
