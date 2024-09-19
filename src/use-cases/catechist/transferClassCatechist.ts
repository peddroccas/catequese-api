import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function transferClassCatechist(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const transferClassCatechist = z.object({
      id: z.string().uuid(),
      classroomId: z.string().uuid(),
    })

    const { classroomId, id } = transferClassCatechist.parse(request.params)

    await prisma.catechist.update({
      where: { id },
      data: { classroomId },
    })

    reply.status(200).send()
  } catch (error) {
    reply.status(500).send(error)
  }
}
