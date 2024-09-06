import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getClassroomsNames(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
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

    reply.status(200).send(classroomNames)
  } catch (error) {
    reply.status(500).send(error)
  }
}
