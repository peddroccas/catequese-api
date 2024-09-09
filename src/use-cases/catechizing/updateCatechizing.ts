import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function updateCatechizing(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const updateCatechizingBodySchema = z.object({
      id: z.string().uuid(),
      name: z.string(),
      birthday: z.coerce.date(),
      address: z.string(),
      personWithSpecialNeeds: z.boolean(),
      hasReceivedBaptism: z.boolean(),
      hasReceivedEucharist: z.boolean(),
      hasReceivedMarriage: z.boolean(),
    })

    const {
      id,
      name,
      address,
      birthday,
      personWithSpecialNeeds,
      hasReceivedBaptism,
      hasReceivedEucharist,
      hasReceivedMarriage,
    } = updateCatechizingBodySchema.parse(request.body)

    await prisma.catechizing.update({
      where: { id },
      data: {
        name,
        address,
        birthday,
        hasReceivedBaptism,
        hasReceivedEucharist,
        hasReceivedMarriage,
        personWithSpecialNeeds,
      },
    })

    reply.status(201).send('Catequizando atualizado')
  } catch (error) {
    reply.status(500).send({ error })
  }
}
