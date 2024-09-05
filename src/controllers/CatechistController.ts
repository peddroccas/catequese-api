import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma'

export class CatechistController {
  static async createNewCatechist(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      const newCatechistBodySchema = z.object({
        name: z.string(),
        birthday: z.coerce.date(),
        phone: z.string(),
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

  static async addCatechistToClassroom(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      const addCatechistToClassroomsParamsSchema = z.object({
        classroomId: z.string().uuid(),
        catechistId: z.string().uuid(),
      })

      const { classroomId, catechistId } =
        addCatechistToClassroomsParamsSchema.parse(request.params)

      await prisma.catechist.update({
        where: { id: catechistId },
        data: { classroomId },
      })

      reply.status(200).send()
    } catch (error) {
      reply.status(500).send(error)
    }
  }

  static async getCatechists(request: FastifyRequest, reply: FastifyReply) {
    try {
      const catechists = await prisma.catechist.findMany({
        select: {
          id: true,
          address: true,
          birthday: true,
          classroomId: true,
          name: true,
          phone: true,
          hasReceivedBaptism: true,
          hasReceivedConfirmation: true,
          hasReceivedEucharist: true,
          hasReceivedMarriage: true,
        },
      })

      reply.status(200).send(catechists)
    } catch (error) {
      reply.status(500).send(error)
    }
  }
}
