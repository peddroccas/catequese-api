import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function addCatechizingToClassroom(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const addCatechizingToClassroomsParamsSchema = z.object({
      classroomId: z.string().uuid(),
      catechizingId: z.string().uuid(),
    })

    const { classroomId, catechizingId } =
      addCatechizingToClassroomsParamsSchema.parse(request.params)

    await prisma.catechizing.update({
      where: { id: catechizingId },
      data: { classroomId },
    })

    reply.status(200).send()
  } catch (error) {
    reply.status(500).send(error)
  }
}
