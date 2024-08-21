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

  static async getCatechizingByClassroom(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    const catechizingClassroomsParamsSchema = z.object({
      classroomId: z.string().uuid(),
    })

    const { classroomId } = catechizingClassroomsParamsSchema.parse(
      request.params,
    )

    const catechizings = await prisma.catechizing.findMany({
      where: { classroom_id: classroomId },
    })

    return reply.status(201).send(catechizings)
  }

  static async addCatechizingToClassroom(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    const catechizingClassroomsParamsSchema = z.object({
      classroomId: z.string().uuid(),
      catechizingId: z.string().uuid(),
    })

    console.log(request.params)
    const { classroomId, catechizingId } =
      catechizingClassroomsParamsSchema.parse(request.params)

    await prisma.catechizing.update({
      where: { id: catechizingId },
      data: { classroom_id: classroomId },
    })

    reply.status(200).send()
  }
}
