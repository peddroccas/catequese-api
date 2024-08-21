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

    await prisma.catechizing.create({
      data: { name },
    })

    return reply.status(201).send()
  }
}
