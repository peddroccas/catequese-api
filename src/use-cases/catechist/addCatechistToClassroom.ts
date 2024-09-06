import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function addCatechistToClassroom(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const addCatechistToClassroomsParamsSchema = z.object({
      classroomId: z.string().uuid(),
      catechistId: z.string().uuid(),
    })

    const { classroomId, catechistId } =
      addCatechistToClassroomsParamsSchema.parse(request.params)

    await prisma.catechist.update({
      where: { id: catechistId },
      data: { classroomId },
    })

    reply.status(200).send()
  } catch (error) {
    reply.status(500).send(error)
  }
}
