import { getClassroomById } from '@/use-cases/classroom/getClassroomById'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getClassroomByIdRoute: FastifyPluginAsyncZod = async app => {
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

        const { classroom } = await getClassroomById({ classroomId })

        return reply.status(200).send(classroom)
      } catch (error) {
        return reply.status(500).send(error)
      }
    }
  )
}
