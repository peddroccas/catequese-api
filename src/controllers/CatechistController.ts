import { createNewCatechist } from '@/use-cases/catechist/createNewCatechist'
import { transferClassCatechist } from '@/use-cases/catechist/transferClassCatechist'
import { getAllCatechists } from '@/use-cases/catechist/getAllCatechist'
import { updateCatechist } from '@/use-cases/catechist/updateCatechist'
import { deleteCatechist } from '@/use-cases/catechist/deleteCatechist'
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

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
        email: z.string().email(),
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
        email,
        hasReceivedBaptism,
        hasReceivedConfirmation,
        hasReceivedEucharist,
        hasReceivedMarriage,
        classroomId,
      } = newCatechistBodySchema.parse(request.body)

      const { newCatechist } = await createNewCatechist({
        name,
        birthday,
        phone,
        address,
        email,
        hasReceivedBaptism,
        hasReceivedConfirmation,
        hasReceivedEucharist,
        hasReceivedMarriage,
        classroomId,
      })

      return reply.status(201).send(newCatechist)
    } catch (error) {
      reply.status(500).send(error)
    }
  }

  static async transferClassCatechist(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      const transferClassCatechistBodySchema = z.object({
        id: z.string().uuid(),
        classroomId: z.string().uuid(),
      })

      const { classroomId, id } = transferClassCatechistBodySchema.parse(
        request.body,
      )

      const { catechist } = await transferClassCatechist({ id, classroomId })

      reply.status(200).send(catechist)
    } catch (error) {
      reply.status(500).send(error)
    }
  }

  static async getAllCatechists(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { catechists } = await getAllCatechists()
      reply.status(200).send(catechists)
    } catch (error) {
      reply
        .status(500)
        .send({ message: 'Erro ao consultar catequistas', error })
    }
  }

  static async updateCatechist(request: FastifyRequest, reply: FastifyReply) {
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

      const { catechist } = await updateCatechist({
        catechistId,
        name,
        address,
        birthday,
        email,
        phone,
        hasReceivedBaptism,
        hasReceivedEucharist,
        hasReceivedMarriage,
      })

      reply.status(201).send(catechist)
    } catch (error) {
      reply.status(500).send({ error })
    }
  }

  static async deleteCatechist(request: FastifyRequest, reply: FastifyReply) {
    try {
      const deleteCatechistParamsSchema = z.object({
        catechistId: z.string().uuid(),
      })

      const { catechistId } = deleteCatechistParamsSchema.parse(request.params)

      const { deletedCatechist } = await deleteCatechist({ catechistId })

      return reply.status(201).send(deletedCatechist)
    } catch (error) {
      reply.status(500).send(error)
    }
  }
}
