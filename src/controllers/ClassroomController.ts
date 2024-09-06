import { createNewClassroom } from '@/use-cases/classroom/createNewClassroom'
import { getClassroomById } from '@/use-cases/classroom/getClassroomById'
import { getClassroomsNames } from '@/use-cases/classroom/getClassroomsNames'
import { getClassroomsNamesBySegment } from '@/use-cases/classroom/getClassroomNamesBySegment'
import { deleteClassroom } from '@/use-cases/classroom/deleteClassroom'

export const ClassroomController = {
  createNewClassroom,
  getClassroomById,
  getClassroomsNames,
  getClassroomsNamesBySegment,
  deleteClassroom,
}
