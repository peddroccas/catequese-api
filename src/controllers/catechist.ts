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

export class catechist {
  static async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const loginBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })

      const { email, password } = loginBodySchema.parse(request.body)

      const { catechist } = await login({
        email: email.toLowerCase(),
        password,
      })

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: catechist.id,
          },
        },
      )

      return reply.status(201).send({
        token,
      })
    } catch (error) {
      return reply.status(500).send(error)
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

      return reply.status(201).send({ message })
    } catch (error) {
      return reply.status(500).send({ message: error })
    }
  }

  static async createNew(request: FastifyRequest, reply: FastifyReply) {
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
        role: z.enum(['MEMBER', 'COORDINATOR']),
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
        role,
      } = newCatechistBodySchema.parse(request.body)

      const { catechist } = await createNewCatechist({
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
        role,
      })

      return reply.status(201).send(catechist)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  static async transferClass(request: FastifyRequest, reply: FastifyReply) {
    try {
      const transferClassCatechistBodySchema = z.object({
        id: z.string().uuid(),
        classroomId: z.string().uuid(),
      })

      const { classroomId, id } = transferClassCatechistBodySchema.parse(
        request.body,
      )

      const { catechist } = await transferClassCatechist({ id, classroomId })

      return reply.status(200).send(catechist)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  static async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { catechists } = await getAllCatechists()
      return reply.status(200).send(catechists)
    } catch (error) {
      reply
        .status(500)
        .send({ message: 'Erro ao consultar catequistas', error })
    }
  }

  static async profile(request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify()
      const id = request.user.sub

      const { catechist } = await getCatechist({ id })
      return reply.status(200).send(catechist)
    } catch (error) {
      reply
        .status(500)
        .send({ message: 'Erro ao consultar catequistas', error })
    }
  }

  static async update(request: FastifyRequest, reply: FastifyReply) {
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

      return reply.status(201).send(catechist)
    } catch (error) {
      return reply.status(500).send({ error })
    }
  }

  static async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const deleteCatechistParamsSchema = z.object({
        catechistId: z.string().uuid(),
      })

      const { catechistId } = deleteCatechistParamsSchema.parse(request.params)

      const { deletedCatechist } = await deleteCatechist({ catechistId })

      return reply.status(201).send(deletedCatechist)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }
}
