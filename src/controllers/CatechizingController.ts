import { createNewCatechizing } from '@/use-cases/catechizing/createNewCatechizing'
import { getCatechizingByClassroom } from '@/use-cases/catechizing/getCatechizingByClassroom'
import { getAllCatechizing } from '@/use-cases/catechizing/getAllCatechizing'
import { updateCatechizing } from '@/use-cases/catechizing/updateCatechizing'
import { deleteCatechizing } from '@/use-cases/catechizing/deleteCatechizing'
import { transferClassCatechizing } from '@/use-cases/catechizing/transferClassCatechizing'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

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

      const { catechizing } = await createNewCatechizing({
        address,
        birthday,
        classroomId,
        hasReceivedBaptism,
        hasReceivedEucharist,
        hasReceivedMarriage,
        name,
        parents,
        personWithSpecialNeeds,
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
      const { catechizings } = await getCatechizingByClassroom({ classroomId })

      reply.status(201).send(catechizings)
    } catch (error) {
      reply.status(500).send(error)
    }
  }

  static async getAllCatechizing(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { catechizings } = await getAllCatechizing()
      reply.status(200).send(catechizings)
    } catch (error) {
      reply.status(500).send(error)
    }
  }

  static async updateCatechizing(request: FastifyRequest, reply: FastifyReply) {
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

      const { catechizing } = await updateCatechizing({
        id,
        name,
        address,
        birthday,
        personWithSpecialNeeds,
        hasReceivedBaptism,
        hasReceivedEucharist,
        hasReceivedMarriage,
      })

      reply.status(201).send({
        message: 'Catequizando atualizado',
        catechizing,
      })
    } catch (error) {
      reply.status(500).send({ error })
    }
  }

  static async deleteCatechizing(request: FastifyRequest, reply: FastifyReply) {
    try {
      const deleteBodySchema = z.object({
        catechizingId: z.string().uuid(),
      })

      const { catechizingId } = deleteBodySchema.parse(request.params)

      const { catechizing } = await deleteCatechizing({ catechizingId })

      reply
        .status(200)
        .send({ message: 'Catequizando deletado com sucesso', catechizing })
    } catch (error) {
      reply.status(500).send(error)
    }
  }

  static async transferClassCatechizing(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      const transferClassCatechizingBodySchema = z.object({
        id: z.string().uuid(),
        newClassroomId: z.string().uuid(),
      })

      const { id, newClassroomId } = transferClassCatechizingBodySchema.parse(
        request.body,
      )

      const { catechizing } = await transferClassCatechizing({
        id,
        newClassroomId,
      })
      reply.status(201).send({
        message: 'Catequizando transferido de sala com sucesso',
        catechizing,
      })
    } catch (error) {
      reply.status(500).send({ error })
    }
  }
}
