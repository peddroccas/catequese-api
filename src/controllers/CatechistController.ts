import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma'

export class CatechistController {
  static async createNewCatechist(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    const newCatechistBodySchema = z.object({
      name: z.string(),
    })

    const { name } = newCatechistBodySchema.parse(request.body)

    await prisma.catechist.create({
      data: { name },
    })

    return reply.status(201).send()
  }
}
