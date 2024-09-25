import { createNewCatechist } from '@/use-cases/catechist/createNewCatechist'
import { transferClassCatechist } from '@/use-cases/catechist/transferClassCatechist'
import { getAllCatechists } from '@/use-cases/catechist/getAllCatechist'
import { updateCatechist } from '@/use-cases/catechist/updateCatechist'
import { deleteCatechist } from '@/use-cases/catechist/deleteCatechist'
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { signUp } from '@/use-cases/catechist/signUp'
import { hasSetPassword } from '@/use-cases/catechist/hasSetPassword'
import { login } from '@/use-cases/catechist/login'
import { getCatechist } from '@/use-cases/catechist/getCatechist'

export class CatechistController {
  static async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const loginBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })

      const { email, password } = loginBodySchema.parse(request.body)

      const { loggedCatechist } = await login({
        email: email.toLowerCase(),
        password,
      })

      reply.status(201).send(loggedCatechist)
    } catch (error) {
      reply.status(500).send(error)
    }
  }

  static async signUp(request: FastifyRequest, reply: FastifyReply) {
    try {
      const newLoginBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })

      const { email, password } = newLoginBodySchema.parse(request.body)

      const { hasSetPassowrd } = await hasSetPassword({
        email: email.toLowerCase(),
      })

      if (hasSetPassowrd) {
        throw new Error('Catequista já cadastrou senha')
      }
      const { message } = await signUp({ email, password })

      reply.status(201).send({ message })
    } catch (error) {
      reply.status(500).send({ message: error })
    }
  }

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
        email: email.toLowerCase(),
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

  static async getCatechist(request: FastifyRequest, reply: FastifyReply) {
    try {
      const updateCatechistParamsSchema = z.object({
        id: z.string().uuid(),
      })
      const { id } = updateCatechistParamsSchema.parse(request.params)

      const { catechist } = await getCatechist({ id })
      reply.status(200).send(catechist)
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
