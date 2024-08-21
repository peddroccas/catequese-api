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
      birthday: z.date(),
      phone: z.string(),
      receivedBaptism: z.boolean(),
      receivedEucharist: z.boolean(),
      receivedConfirmation: z.boolean(),
      receivedMarriage: z.boolean(),
    })

    const {
      name,
      birthday,
      phone,
      receivedBaptism,
      receivedConfirmation,
      receivedEucharist,
      receivedMarriage,
    } = newCatechistBodySchema.parse(request.body)

    await prisma.catechist.create({
      data: {
        name,
        birthday,
        phone,
        receivedBaptism,
        receivedConfirmation,
        receivedEucharist,
        receivedMarriage,
      },
    })

    return reply.status(201).send()
  }
}
