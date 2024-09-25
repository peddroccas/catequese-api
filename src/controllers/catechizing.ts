import { createNewCatechizing } from '@/use-cases/catechizing/createNewCatechizing'
import { getCatechizingByClassroom } from '@/use-cases/catechizing/getCatechizingByClassroom'
import { getAllCatechizing } from '@/use-cases/catechizing/getAllCatechizing'
import { updateCatechizing } from '@/use-cases/catechizing/updateCatechizing'
import { deleteCatechizing } from '@/use-cases/catechizing/deleteCatechizing'
import { transferClassCatechizing } from '@/use-cases/catechizing/transferClassCatechizing'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export class catechizing {
  static async createNew(request: FastifyRequest, reply: FastifyReply) {
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

      return reply.status(201).send(catechizing)
    } catch (error) {
      return reply.status(500).send({ error })
    }
  }

  static async getByClassroom(request: FastifyRequest, reply: FastifyReply) {
    try {
      const catechizingsPerClassroomParamsSchema = z.object({
        classroomId: z.string().uuid(),
      })

      const { classroomId } = catechizingsPerClassroomParamsSchema.parse(
        request.params,
      )
      const { catechizings } = await getCatechizingByClassroom({ classroomId })

      return reply.status(201).send(catechizings)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  static async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { catechizings } = await getAllCatechizing()
      return reply.status(200).send(catechizings)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  static async update(request: FastifyRequest, reply: FastifyReply) {
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

      return reply.status(201).send({
        message: 'Catequizando atualizado',
        catechizing,
      })
    } catch (error) {
      return reply.status(500).send({ error })
    }
  }

  static async delete(request: FastifyRequest, reply: FastifyReply) {
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
      return reply.status(500).send(error)
    }
  }

  static async transferClass(request: FastifyRequest, reply: FastifyReply) {
    try {
      const transferClassCatechizingBodySchema = z.object({
        id: z.string().uuid(),
        classroomId: z.string().uuid(),
      })

      const { id, classroomId } = transferClassCatechizingBodySchema.parse(
        request.body,
      )

      const { catechizing } = await transferClassCatechizing({
        id,
        classroomId,
      })
      return reply.status(201).send({
        message: 'Catequizando transferido de sala com sucesso',
        catechizing,
      })
    } catch (error) {
      return reply.status(500).send({ error })
    }
  }
}
