import { FastifyInstance } from 'fastify'
import { ClassroomController } from '../controllers/ClassroomController'

export async function classroomsRoutes(app: FastifyInstance) {
  app.post('/classrooms', ClassroomController.createNewClassroom)
}
