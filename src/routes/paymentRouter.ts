import { FastifyInstance } from 'fastify'
import { PaymentController } from '../controllers/PaymentController'

export async function PaymentRoutes(app: FastifyInstance) {
  app.post('/payments/:catechizingName', PaymentController.createNewInstallment)
  app.get(
    '/payments/:catechizingName',
    PaymentController.getPaymentByCatechizing,
  )
}
