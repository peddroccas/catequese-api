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
    classroomName: string
    startedAt: number
  }[] = []
  classrooms.forEach((classroom) => {
    classroomNames.push({
      id: classroom.id,
      classroomName: `Turma ${classroom.roomNumber} - ${classroom.catechists.map((catechist) => catechist.name.split(' ')[0]).join(' e ')}`,
      startedAt: classroom.startedAt,
    })
  })

  return { classroomNames }
}
