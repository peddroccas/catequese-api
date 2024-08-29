import { FastifyInstance } from 'fastify'
import { ClassroomController } from '../controllers/ClassroomController'

export async function classroomsRoutes(app: FastifyInstance) {
  app.post('/classrooms', ClassroomController.createNewClassroom)
  app.get(
    '/classrooms/:classroomId',
    ClassroomController.getClassroomByRoomNumber,
  )
  app.get(
    '/classrooms/names/:segment',
    ClassroomController.getClassroomsNamesBySegment,
  )
  app.get('/classrooms/names', ClassroomController.getClassroomsNames)
}
