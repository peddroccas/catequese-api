import { FastifyInstance } from 'fastify'
import { ClassroomController } from '../controllers/ClassroomController'

export async function classroomsRoutes(app: FastifyInstance) {
  app.post('/classrooms', ClassroomController.createNewClassroom)
  app.get('/classrooms/:classroomId', ClassroomController.getClassroomById)
  app.get(
    '/classrooms/names/:segment',
    ClassroomController.getClassroomsNamesBySegment,
  )
  app.get('/classrooms/names', ClassroomController.getClassroomsNames)
  app.delete('/classrooms/:classroomId', ClassroomController.deleteClassroom)
}
