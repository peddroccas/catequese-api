import { FastifyInstance } from 'fastify'
import { payment } from '../controllers/payment'

export async function PaymentRoutes(app: FastifyInstance) {
  app.post('/payments/:catechizingId', payment.createNewInstallment)
  app.get('/payments/:catechizingId', payment.getByCatechizing)
}
