import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma'

export class CatechizingController {
  static async createNewCatechizing(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    const newCatechizingBodySchema = z.object({
      name: z.string(),
    })

    const { name } = newCatechizingBodySchema.parse(request.body)

    const { id } = await prisma.catechizing.create({
      data: { name },
    })

    await prisma.payment.create({ data: { catechizing_id: id } })

    return reply.status(201).send()
  }
}
