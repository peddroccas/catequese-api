import { FastifyInstance } from 'fastify'
import { PaymentController } from '../controllers/PaymentController'

export async function PaymentRoutes(app: FastifyInstance) {
  app.post('/payments/:catechizingId', PaymentController.createNewInstallment)
  app.get('/payments/:catechizingId', PaymentController.getPaymentByCatechizing)
}
