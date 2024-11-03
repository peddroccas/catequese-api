import { deleteClassroom } from '@/use-cases/classroom/deleteClassroom'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const deleteClassroomRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/classrooms/:classroomId',
    {
      schema: {
        params: z.object({
          classroomId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { classroomId } = request.params

        const { classroom } = await deleteClassroom({ classroomId })

        return reply.status(200).send({
          message: 'Turma deletada com sucesso',
          classroom,
        })
      } catch (error) {
        return reply.status(500).send(error)
      }
    }
  )
}
