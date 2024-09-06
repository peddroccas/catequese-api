import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function getClassroomsNamesBySegment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const classroomBodySchema = z.object({
      segment: z.enum([
        '1° Eucaristia',
        'Crisma',
        'Catequizandos Adultos',
        'Catecúmenos Adultos',
        'Sementinha',
        'Pré-Eucaristia',
      ]),
    })

    const { segment } = classroomBodySchema.parse(request.params)

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

    reply.status(200).send(classroomNames)
  } catch (error) {
    reply.status(500).send(error)
  }
}
