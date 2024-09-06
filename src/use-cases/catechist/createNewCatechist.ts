import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createNewCatechist(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const newCatechistBodySchema = z.object({
      name: z.string(),
      birthday: z.coerce.date(),
      phone: z.string(),
      email: z.string().email(),
      address: z.string(),
      hasReceivedBaptism: z.boolean(),
      hasReceivedEucharist: z.boolean(),
      hasReceivedConfirmation: z.boolean(),
      hasReceivedMarriage: z.boolean(),
      classroomId: z.optional(z.string().uuid()),
    })

    const {
      name,
      birthday,
      phone,
      address,
      email,
      hasReceivedBaptism,
      hasReceivedConfirmation,
      hasReceivedEucharist,
      hasReceivedMarriage,
      classroomId,
    } = newCatechistBodySchema.parse(request.body)

    await prisma.catechist.create({
      data: {
        name,
        birthday,
        phone,
        address,
        email,
        hasReceivedBaptism,
        hasReceivedConfirmation,
        hasReceivedEucharist,
        hasReceivedMarriage,
        classroomId,
      },
    })

    return reply.status(201).send()
  } catch (error) {
    reply.status(500).send(error)
  }
}
