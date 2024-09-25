import { FastifyInstance } from 'fastify'
import { classroom } from '../controllers/classroom'

export async function classroomsRoutes(app: FastifyInstance) {
  app.post('/classrooms', classroom.createNew)
  app.put('/classrooms', classroom.update)
  app.get('/classrooms/:classroomId', classroom.getById)
  app.get('/classrooms/names/:segment', classroom.getNamesBySegment)
  app.get('/classrooms/names', classroom.getNames)
  app.delete('/classrooms/:classroomId', classroom.delete)
}
