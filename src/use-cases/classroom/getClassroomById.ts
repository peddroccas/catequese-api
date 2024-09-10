import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function getClassroomById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const classroomBodySchema = z.object({
      classroomId: z.string().uuid(),
    })

    const { classroomId } = classroomBodySchema.parse(request.params)

    const classroomResponse = await prisma.classroom.findUnique({
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

    reply.status(200).send(classroomResponse)
  } catch (error) {
    reply.status(500).send(error)
  }
}
