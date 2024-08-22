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

      reply.status(201).send()
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao cadastrar novo catequizando' })
    }
  }

  static async getCatechizingByClassroom(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      const catechizingsPerClassroomParamsSchema = z.object({
        classroomName: z.string(),
      })

      const { classroomName } = catechizingsPerClassroomParamsSchema.parse(
        request.params,
      )

      const roomNumberMatch = classroomName.match(/Turma (\d+) -/)

      const roomNumber = roomNumberMatch ? roomNumberMatch[1] : null

      const catechizings = await prisma.catechizing.findMany({
        where: { classroom: { roomNumber } },
        select: { name: true },
      })

      reply
        .status(201)
        .send(catechizings.map((catechizing) => catechizing.name))
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
        data: { classroom_id: classroomId },
      })

      reply.status(200).send()
    } catch (error) {
      reply
        .status(500)
        .send({ error: 'Erro ao cadastrar catequizando em uma sala' })
    }
  }
}