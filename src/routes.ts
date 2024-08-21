import { FastifyInstance } from 'fastify'
import { classroomsRoutes } from './routes/classroomRouter'
import { catechistsRoutes } from './routes/catechistRouter'
import { catechizingRoutes } from './routes/catechizingRouter'

export async function appRoutes(app: FastifyInstance) {
  app.register(classroomsRoutes)
  app.register(catechistsRoutes)
  app.register(catechizingRoutes)
}
