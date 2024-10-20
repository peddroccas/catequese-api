import { getClassroomsNamesBySegment } from '@/use-cases/classroom/getClassroomNamesBySegment'
import { deleteClassroom } from '@/use-cases/classroom/deleteClassroom'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export class classroom {
  static async getNamesBySegment(request: FastifyRequest, reply: FastifyReply) {
    try {
      const classroomBodySchema = z.object({
        segment: z.enum([
          '1° Eucaristia',
          'Crisma',
          'Catequizandos Adultos',
          'Catecúmenos Adultos',
          'Sementinha',
          'Pré-Eucaristia',
        ]),
      })

      const { segment } = classroomBodySchema.parse(request.params)

      const { classroomNames } = await getClassroomsNamesBySegment({ segment })

      return reply.status(200).send(classroomNames)
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  static async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const deleteBodySchema = z.object({
        classroomId: z.string().uuid(),
      })
      const { classroomId } = deleteBodySchema.parse(request.params)

      const { classroom } = await deleteClassroom({ classroomId })

      return reply.status(200).send({
        message: 'Turma deletada com sucesso',
        classroom,
      })
    } catch (error) {
      return reply.status(500).send(error)
    }
  }
}
