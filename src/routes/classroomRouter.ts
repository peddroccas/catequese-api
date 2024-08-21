import { FastifyInstance } from 'fastify'
import { ClassroomController } from '../controllers/ClassroomController'

export async function classroomsRoutes(app: FastifyInstance) {
  app.post('/classrooms', ClassroomController.createNewClassroom)
  app.get(
    '/classrooms/:roomNumber',
    ClassroomController.getClassroomByRoomNumber,
  )
  app.get('/classrooms', ClassroomController.getClassroomsNames)
}
