import { updateClassroom } from '@/use-cases/classroom/updateClassroom'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const updateClassroomRoute: FastifyPluginAsyncZod = async app => {
  app.put(
    '/classrooms',
    {
      schema: {
        body: z.object({
          id: z.string().uuid(),
          roomNumber: z.coerce.number(),
          segment: z.enum([
            '1° Eucaristia',
            'Crisma',
            'Catequizandos Adultos',
            'Catecúmenos Adultos',
            'Sementinha',
            'Pré-Eucaristia',
          ]),
          catechists: z.object({ id: z.string().uuid() }).array(),
          startedAt: z.number().min(2023),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id, roomNumber, segment, catechists, startedAt } = request.body

        const { classroom } = await updateClassroom({
          id,
          roomNumber,
          segment,
          catechists: catechists.map(catechist => catechist.id),
          startedAt,
        })

        return reply.status(201).send(classroom)
      } catch (error) {
        return reply.status(500).send(error)
      }
    }
  )
}
