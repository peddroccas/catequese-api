import { FastifyInstance } from 'fastify'
import { CatechistController } from '../controllers/CatechistController'

export async function catechistsRoutes(app: FastifyInstance) {
  app.post('/catechists', CatechistController.createNewCatechist)
}
