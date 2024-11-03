import type { FastifyInstance } from 'fastify'
import { createNewClassroomRoute } from '@/http/routes/create-new-classroom'
import { updateClassroomRoute } from '@/http/routes/update-classroom'
import { getClassroomByIdRoute } from '@/http/routes/get-classroom-by-id'
import { getClassroomsRoute } from '@/http/routes/get-classrooms'
import { getClassroomsNameBySegmentRoute } from '@/http/routes/get-classrooms-name-by-segment'
import { deleteClassroomRoute } from '@/http/routes/delete-classroom'

export async function classroomsRoutes(app: FastifyInstance) {
  app.register(createNewClassroomRoute)
  app.register(updateClassroomRoute)
  app.register(getClassroomByIdRoute)
  app.register(getClassroomsRoute)
  app.register(getClassroomsNameBySegmentRoute)
  app.register(deleteClassroomRoute)
}
