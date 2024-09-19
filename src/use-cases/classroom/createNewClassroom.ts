import { prisma } from '@/lib/prisma'

interface CreateNewClassroomRequest {
  roomNumber: number
  segment: string
  catechists: string[]
  startedAt: number
}

export async function createNewClassroom({
  roomNumber,
  segment,
  catechists,
  startedAt,
}: CreateNewClassroomRequest) {
  const classroom = await prisma.classroom.create({
    data: {
      roomNumber,
      segment,
      catechists: { connect: catechists.map((id) => ({ id })) },
      startedAt,
    },
  })

  return { classroom }
}
