import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createNewClassroom(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const classroomBodySchema = z.object({
      roomNumber: z.number(),
      segment: z.string(),
      catechists: z.string().uuid().array(),
      startedAt: z.number().min(2023),
    })

    const { roomNumber, segment, catechists, startedAt } =
      classroomBodySchema.parse(request.body)

    await prisma.classroom.create({
      data: {
        roomNumber,
        segment,
        catechists: { connect: catechists.map((id) => ({ id })) },
        startedAt,
      },
    })

    reply.status(201).send()
  } catch (error) {
    reply.status(500).send(error)
  }
}
