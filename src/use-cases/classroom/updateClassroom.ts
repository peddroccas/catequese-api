import { prisma } from '@/lib/prisma'

interface UpdateClassroomRequest {
  id: string
  roomNumber: number
  segment: string
  catechists: string[]
  startedAt: number
}

export async function updateClassroom({
  id,
  roomNumber,
  segment,
  catechists,
  startedAt,
}: UpdateClassroomRequest) {
  const currentCatechists = await prisma.classroom
    .findUnique({
      where: { id },
      select: { catechists: { select: { id: true } } },
    })
    .catechists()

  const currentCatechistIds = currentCatechists!.map(catechist => catechist.id)

  const catechistsToDisconnect = currentCatechistIds.filter(
    id => !catechists.includes(id)
  )
  const classroom = await prisma.classroom.update({
    where: { id },
    data: {
      roomNumber,
      segment,
      catechists: {
        connect: catechists.map(id => ({ id })),
        disconnect: catechistsToDisconnect.map(id => ({ id })),
      },
      startedAt,
    },
  })

  return { classroom }
}
