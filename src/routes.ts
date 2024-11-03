import type { FastifyInstance } from 'fastify'
import { classroomsRoutes } from './http/controllers/classroom'
import { catechistsRoutes } from './routes/catechistRouter'
import { catechizingRoutes } from './routes/catechizingRouter'
import { PaymentRoutes } from './routes/paymentRouter'

export async function appRoutes(app: FastifyInstance) {
  app.register(classroomsRoutes)
  app.register(catechistsRoutes)
  app.register(catechizingRoutes)
  app.register(PaymentRoutes)
}
