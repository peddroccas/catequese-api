import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function updateCatechist(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const updateCatechistParamsSchema = z.object({
      catechistId: z.string().uuid(),
    })
    const updateCatechistBodySchema = z.object({
      name: z.string(),
      birthday: z.coerce.date(),
      address: z.string(),
      email: z.string().email(),
      phone: z.string(),
      hasReceivedBaptism: z.boolean(),
      hasReceivedEucharist: z.boolean(),
      hasReceivedMarriage: z.boolean(),
    })

    const {
      name,
      address,
      birthday,
      email,
      phone,
      hasReceivedBaptism,
      hasReceivedEucharist,
      hasReceivedMarriage,
    } = updateCatechistBodySchema.parse(request.body)
    const { catechistId } = updateCatechistParamsSchema.parse(request.params)

    await prisma.catechist.update({
      where: { id: catechistId },
      data: {
        name,
        address,
        email,
        birthday,
        phone,
        hasReceivedBaptism,
        hasReceivedEucharist,
        hasReceivedMarriage,
      },
    })

    reply.status(201).send('Catequizando atualizado')
  } catch (error) {
    reply.status(500).send({ error })
  }
}
