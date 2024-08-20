import { FastifyInstance } from 'fastify'
import { ClassroomController } from '../controllers/ClassroomController'

export async function catechistsRoutes(app: FastifyInstance) {
  app.get('/catechists', () => {
    console.log('123')
  })
}
