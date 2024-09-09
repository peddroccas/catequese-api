import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function transferClassCatechizing(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const transferClassCatechizingBodySchema = z.object({
      id: z.string().uuid(),
      newClassroomId: z.string().uuid(),
    })

    const { id, newClassroomId } = transferClassCatechizingBodySchema.parse(
      request.body,
    )

    await prisma.catechizing.update({
      where: { id },
      data: {
        classroomId: newClassroomId,
      },
    })

    reply.status(201).send('Catequizando transferido de sala com sucesso')
  } catch (error) {
    reply.status(500).send({ error })
  }
}
