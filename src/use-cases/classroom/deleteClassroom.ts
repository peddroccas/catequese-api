import { prisma } from '@/lib/prisma'

interface DeleteClassroomRequest {
  classroomId: string
}

export async function deleteClassroom({ classroomId }: DeleteClassroomRequest) {
  const classroom = await prisma.classroom.delete({
    where: { id: classroomId },
  })

  return { classroom }
}
