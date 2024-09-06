import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function deleteClassroom(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const deleteBodySchema = z.object({
      classroomId: z.string().uuid(),
    })

    const { classroomId } = deleteBodySchema.parse(request.params)

    await prisma.classroom.delete({
      where: { id: classroomId },
    })

    reply.status(200).send({ message: 'Turma deletada com sucesso' })
  } catch (error) {
    reply.status(500).send(error)
  }
}
