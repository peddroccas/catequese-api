import type { FastifyInstance } from 'fastify'
import { classroom } from '../http/controllers/classroom'
import { createNewClassroomRoute } from '@/http/routes/create-new-classroom'
import { updateClassroomRoute } from '@/http/routes/update-classroom'
import { getClassroomByIdRoute } from '@/http/routes/get-classroom-by-id'
import { getClassroomsRoute } from '@/http/routes/get-classrooms'

export async function classroomsRoutes(app: FastifyInstance) {
  app.register(createNewClassroomRoute)
  app.register(updateClassroomRoute)
  app.register(getClassroomByIdRoute)
  app.register(getClassroomsRoute)
  app.get('/classrooms/names/:segment', classroom.getNamesBySegment)
  app.delete('/classrooms/:classroomId', classroom.delete)
}
