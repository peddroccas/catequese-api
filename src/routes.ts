import { FastifyInstance } from 'fastify'
import { classroomsRoutes } from './routes/classroomRouter'
import { catechistsRoutes } from './routes/catechistRouter'

export async function appRoutes(app: FastifyInstance) {
  app.register(classroomsRoutes)
  app.register(catechistsRoutes)
}
