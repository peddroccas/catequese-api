import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function getCatechizingByClassroom(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const catechizingsPerClassroomParamsSchema = z.object({
      classroomId: z.string().uuid(),
    })

    const { classroomId } = catechizingsPerClassroomParamsSchema.parse(
      request.params,
    )
    const catechizings = await prisma.catechizing.findMany({
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

    reply.status(201).send(catechizings)
  } catch (error) {
    reply.status(500).send(error)
  }
}
