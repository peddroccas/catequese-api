import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function deleteCatechizing(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const deleteBodySchema = z.object({
      catechizingId: z.string().uuid(),
    })

    const { catechizingId } = deleteBodySchema.parse(request.params)

    await prisma.catechizing.delete({
      where: { id: catechizingId },
    })

    reply.status(200).send({ message: 'Catequizando deletado com sucesso' })
  } catch (error) {
    reply.status(500).send(error)
  }
}
