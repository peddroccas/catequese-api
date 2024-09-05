import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma'

export class CatechizingController {
  static async createNewCatechizing(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      const newCatechizingBodySchema = z.object({
        name: z.string(),
        birthday: z.coerce.date(),
        address: z.string(),
        classroomId: z.string().uuid(),
        personWithSpecialNeeds: z.boolean(),
        hasReceivedBaptism: z.boolean(),
        hasReceivedEucharist: z.boolean(),
        hasReceivedMarriage: z.boolean(),
        parents: z.object({
          name: z.string(),
          phone: z.string(),
          kinship: z.string(),
        }),
      })

      const {
        name,
        address,
        birthday,
        classroomId,
        personWithSpecialNeeds,
        hasReceivedBaptism,
        hasReceivedEucharist,
        hasReceivedMarriage,
        parents,
      } = newCatechizingBodySchema.parse(request.body)

      const catechizing = await prisma.catechizing.create({
        data: {
          name,
          address,
          birthday,
          hasReceivedBaptism,
          hasReceivedEucharist,
          hasReceivedMarriage,
          personWithSpecialNeeds,
          classroomId,
          parents: {
            create: {
              name: parents.name,
              phone: parents.phone,
              kinship: parents.kinship,
            },
          },
          payments: {
            create: {
              toBePaid:
                (await prisma.classroom
                  .findFirst({
                    select: { startedAt: true },
                    where: { id: classroomId },
                  })
                  .then((startedAt) => startedAt?.startedAt)) === 2023
                  ? 150
                  : 250,
            },
          },
        },
      })

      reply.status(201).send(catechizing)
    } catch (error) {
      reply.status(500).send({ error })
    }
  }

  static async getCatechizingByClassroom(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      const catechizingsPerClassroomParamsSchema = z.object({
        classroomId: z.string().uuid(),
      })

      const { classroomId } = catechizingsPerClassroomParamsSchema.parse(
        request.params,
      )

      const catechizings = await prisma.catechizing.findMany({
        where: { classroom: { id: classroomId } },
        select: { name: true, id: true },
        orderBy: { name: 'asc' },
      })

      reply.status(201).send(catechizings)
    } catch (error) {
      reply
        .status(500)
        .send({ error: 'Erro ao consultar catequizandos por sala' })
    }
  }

  static async addCatechizingToClassroom(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      const addCatechizingToClassroomsParamsSchema = z.object({
        classroomId: z.string().uuid(),
        catechizingId: z.string().uuid(),
      })

      const { classroomId, catechizingId } =
        addCatechizingToClassroomsParamsSchema.parse(request.params)

      await prisma.catechizing.update({
        where: { id: catechizingId },
        data: { classroomId },
      })

      reply.status(200).send()
    } catch (error) {
      reply
        .status(500)
        .send({ error: 'Erro ao cadastrar catequizando em uma sala' })
    }
  }
}
