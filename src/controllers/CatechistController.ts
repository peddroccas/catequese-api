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
        birthday: z.date(),
        phone: z.string(),
        address: z.string(),
        receivedBaptism: z.boolean(),
        receivedEucharist: z.boolean(),
        receivedConfirmation: z.boolean(),
        receivedMarriage: z.boolean(),
        classroomId: z.string().uuid(),
      })

      const {
        name,
        birthday,
        phone,
        address,
        receivedBaptism,
        receivedConfirmation,
        receivedEucharist,
        receivedMarriage,
        classroomId,
      } = newCatechistBodySchema.parse(request.body)

      await prisma.catechist.create({
        data: {
          name,
          birthday,
          phone,
          address,
          receivedBaptism,
          receivedConfirmation,
          receivedEucharist,
          receivedMarriage,
          classroom_id: classroomId,
        },
      })

      return reply.status(201).send()
    } catch (error) {
      reply
        .status(500)
        .send({ error: 'Erro ao cadastrar novo catequista' + error })
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
        data: { classroom_id: classroomId },
      })

      reply.status(200).send()
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao adicionar catequista a sala' })
    }
  }

  static async getCatechists(request: FastifyRequest, reply: FastifyReply) {
    try {
      const catechist = await prisma.catechist.findMany({
        select: {
          id: true,
          address: true,
          birthday: true,
          classroom_id: true,
          name: true,
          phone: true,
          receivedBaptism: true,
          receivedConfirmation: true,
          receivedEucharist: true,
          receivedMarriage: true,
        },
      })

      reply.status(200).send(catechist)
    } catch (error) {
      reply
        .status(500)
        .send({ error: 'Erro ao consultar catequista pelo nome' })
    }
  }
}
