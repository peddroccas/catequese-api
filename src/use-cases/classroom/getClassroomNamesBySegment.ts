import { prisma } from '@/lib/prisma'

interface GetClassroomNamesBySegmentRequest {
  segment:
    | '1° Eucaristia'
    | 'Crisma'
    | 'Catequizandos Adultos'
    | 'Catecúmenos Adultos'
    | 'Sementinha'
    | 'Pré-Eucaristia'
}

export async function getClassroomsNamesBySegment({
  segment,
}: GetClassroomNamesBySegmentRequest) {
  const classrooms = await prisma.classroom.findMany({
    orderBy: { roomNumber: 'asc' },
    where: { segment },
    select: {
      id: true,
      roomNumber: true,
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
  }[] = []
  classrooms.forEach((classroom) => {
    classroomNames.push({
      id: classroom.id,
      classroomName: `Turma ${classroom.roomNumber} - ${classroom.catechists.map((catechist) => catechist.name.split(' ')[0]).join(' e ')}`,
    })
  })

  return { classroomNames }
}
