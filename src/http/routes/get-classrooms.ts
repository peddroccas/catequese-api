import { getClassrooms } from '@/use-cases/classroom/getClassroomsNames'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const getClassroomsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/classrooms', async (request, reply) => {
    try {
      const { classrooms } = await getClassrooms()
      return reply.status(200).send(classrooms)
    } catch (error) {
      return reply.status(500).send(error)
    }
  })
}
