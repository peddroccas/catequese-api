import { createNewClassroom } from '@/use-cases/classroom/createNewClassroom'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createNewClassroomRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/classrooms',
    {
      schema: {
        body: z.object({
          roomNumber: z.number(),
          segment: z.enum([
            '1° Eucaristia',
            'Crisma',
            'Catequizandos Adultos',
            'Catecúmenos Adultos',
            'Sementinha',
            'Pré-Eucaristia',
          ]),
          catechists: z.string().uuid().array(),
          startedAt: z.number().min(2024),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { roomNumber, segment, catechists, startedAt } = request.body

        const { classroom } = await createNewClassroom({
          roomNumber,
          segment,
          catechists,
          startedAt,
        })

        return reply.status(201).send(classroom)
      } catch (error) {
        return reply.status(500).send(error)
      }
    }
  )
}
