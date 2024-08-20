import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

export class ClassroomController {
  static async createNewClassroom(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    const classroomBodySchema = z.object({
      roomNumber: z.number(),
      segment: z.string(),
    })

    const { roomNumber, segment } = classroomBodySchema.parse(request.body)

    await prisma.classroom.create({
      data: {
        roomNumber,
        segment,
      },
    })

    return reply.status(201).send()
  }
}
