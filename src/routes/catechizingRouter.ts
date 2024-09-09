import { FastifyInstance } from 'fastify'
import { CatechizingController } from '../controllers/CatechizingController'

export async function catechizingRoutes(app: FastifyInstance) {
  app.post('/catechizings/new', CatechizingController.createNewCatechizing)
  app.get(
    '/catechizings/:classroomId',
    CatechizingController.getCatechizingByClassroom,
  )
  app.get('/catechizings', CatechizingController.getAllCatechizing)
  app.put(
    '/catechizings/:catechizingId/:classroomId',
    CatechizingController.addCatechizingToClassroom,
  )
  app.put('/catechizings', CatechizingController.updateCatechizing)
  app.patch(
    '/catechizings/transfer',
    CatechizingController.transferClassCatechizing,
  )
  app.delete(
    '/catechizings/:catechizingId',
    CatechizingController.deleteCatechizing,
  )
}
