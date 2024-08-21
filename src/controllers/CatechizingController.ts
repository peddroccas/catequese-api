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
      birthday: z.date(),
      adress: z.string(),
      personWithSpecialNeeds: z.string(),
      receivedBaptism: z.boolean(),
      receivedEucharist: z.boolean(),
      receivedMarriage: z.boolean(),
      parent: z.object({
        name: z.string(),
        phone: z.string(),
        kinship: z.string(),
      }),
    })

    const {
      name,
      adress,
      birthday,
      personWithSpecialNeeds,
      receivedBaptism,
      receivedEucharist,
      receivedMarriage,
      parent,
    } = newCatechizingBodySchema.parse(request.body)

    const { id } = await prisma.catechizing.create({
      data: {
        name,
        adress,
        birthday,
        receivedBaptism,
        receivedEucharist,
        receivedMarriage,
        personWithSpecialNeeds,
      },
    })

    await prisma.payment.create({ data: { catechizing_id: id } })
    await prisma.parent.create({
      data: {
        catechizing_id: id,
        name: parent.name,
        phone: parent.phone,
        kinship: parent.kinship,
      },
    })

    return reply.status(201).send()
  }
}
