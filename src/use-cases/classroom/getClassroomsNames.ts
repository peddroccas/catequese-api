import { prisma } from '@/lib/prisma'

export async function getClassroomsNames() {
  const classrooms = await prisma.classroom.findMany({
    orderBy: { roomNumber: 'asc' },
    select: {
      id: true,
      roomNumber: true,
      startedAt: true,
      catechists: {
        select: {
          name: true,
        },
      },
    },
  })

  const classroomNames: {
    id: string
    name: string
    roomNumber: number
    startedAt: number
  }[] = []
  classrooms.forEach((classroom) => {
    classroomNames.push({
      id: classroom.id,
      name: `Turma ${classroom.roomNumber} - ${classroom.catechists.map((catechist) => catechist.name.split(' ')[0]).join(' e ')}`,
      startedAt: classroom.startedAt,
      roomNumber: Number(classroom.roomNumber),
    })
  })

  return { classroomNames }
}
