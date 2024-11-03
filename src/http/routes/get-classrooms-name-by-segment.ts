import { getClassroomsNamesBySegment } from '@/use-cases/classroom/getClassroomNamesBySegment'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getClassroomsNameBySegmentRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/classrooms/names/:segment',
      {
        schema: {
          params: z.object({
            segment: z.enum([
              '1° Eucaristia',
              'Crisma',
              'Catequizandos Adultos',
              'Catecúmenos Adultos',
              'Sementinha',
              'Pré-Eucaristia',
            ]),
          }),
        },
      },
      async (request, reply) => {
        try {
          const { segment } = request.params

          const { classroomNames } = await getClassroomsNamesBySegment({
            segment,
          })

          return reply.status(200).send(classroomNames)
        } catch (error) {
          return reply.status(500).send(error)
        }
      }
    )
  }
