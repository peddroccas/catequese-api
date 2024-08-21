import { FastifyInstance } from 'fastify'
import { CatechizingController } from '../controllers/CatechizingController'

export async function catechizingRoutes(app: FastifyInstance) {
  app.post('/catechizings', CatechizingController.createNewCatechizing)
}
