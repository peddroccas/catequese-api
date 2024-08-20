import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { NewCatechistUseCase } from '@/use-cases/newCatechist'
import { PrismaCatechistsRepository } from '@/repositories/prisma-catechists-repository'

export async function newCatechist(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const newCatechistBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = newCatechistBodySchema.parse(request.body)

  try {
    const catechistsRepository = new PrismaCatechistsRepository()
    const newCatechistUseCase = new NewCatechistUseCase(catechistsRepository)
    await newCatechistUseCase.execute({
      name,
      email,
      password,
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
