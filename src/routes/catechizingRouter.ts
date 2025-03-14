import { FastifyInstance } from 'fastify'
import { catechizing } from '../http/controllers/catechizing'
import { updateValueCatechizing } from '@/use-cases/catechizing/updateCatechizingCheckbookValue'

export async function catechizingRoutes(app: FastifyInstance) {
  app.post('/catechizings/new', catechizing.createNew)
  app.get('/catechizings/:classroomId', catechizing.getByClassroom)
  app.get('/catechizings', catechizing.getAll)
  app.put('/catechizings', catechizing.update)
  app.patch('/catechizings/transfer', catechizing.transferClass)
  app.delete('/catechizings/:catechizingId', catechizing.delete)
  app.post('/catechizing/update-default', () => updateValueCatechizing)
}
