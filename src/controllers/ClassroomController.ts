import { createNewClassroom } from '@/use-cases/classroom/createNewClassroom'
import { getClassroomById } from '@/use-cases/classroom/getClassroomById'
import { getClassroomsNames } from '@/use-cases/classroom/getClassroomsNames'
import { getClassroomsNamesBySegment } from '@/use-cases/classroom/getClassroomNamesBySegment'
import { deleteClassroom } from '@/use-cases/classroom/deleteClassroom'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { editClassroom } from '@/use-cases/classroom/editClassroom'

export class ClassroomController {
  static async createNewClassroom(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      const classroomBodySchema = z.object({
        roomNumber: z.number(),
        segment: z.enum([
          '1° Eucaristia',
          'Crisma',
          'Catequizandos Adultos',
          'Catecúmenos Adultos',
          'Sementinha',
          'Pré-Eucaristia',
        ]),
        catechists: z.string().uuid().array(),
        startedAt: z.number().min(2023),
      })

      const { roomNumber, segment, catechists, startedAt } =
        classroomBodySchema.parse(request.body)

      const { classroom } = await createNewClassroom({
        roomNumber,
        segment,
        catechists,
        startedAt,
      })

      reply.status(201).send(classroom)
    } catch (error) {
      reply.status(500).send(error)
    }
  }

  static async editClassroom(request: FastifyRequest, reply: FastifyReply) {
    try {
      const classroomBodySchema = z.object({
        id: z.string().uuid(),
        roomNumber: z.coerce.number(),
        segment: z.enum([
          '1° Eucaristia',
          'Crisma',
          'Catequizandos Adultos',
          'Catecúmenos Adultos',
          'Sementinha',
          'Pré-Eucaristia',
        ]),
        catechists: z.object({ id: z.string().uuid() }).array(),
        startedAt: z.number().min(2023),
      })

      const { id, roomNumber, segment, catechists, startedAt } =
        classroomBodySchema.parse(request.body)

      const { classroom } = await editClassroom({
        id,
        roomNumber,
        segment,
        catechists: catechists.map((catechist) => catechist.id),
        startedAt,
      })

      reply.status(201).send(classroom)
    } catch (error) {
      reply.status(500).send(error)
    }
  }

  static async getClassroomById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const classroomBodySchema = z.object({
        classroomId: z.string().uuid(),
      })

      const { classroomId } = classroomBodySchema.parse(request.params)

      const { classroom } = await getClassroomById({ classroomId })

      reply.status(200).send(classroom)
    } catch (error) {
      reply.status(500).send(error)
    }
  }

  static async getClassroomsNames(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      const { classroomNames } = await getClassroomsNames()
      reply.status(200).send(classroomNames)
    } catch (error) {
      reply.status(500).send(error)
    }
  }

  static async getClassroomsNamesBySegment(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      const classroomBodySchema = z.object({
        segment: z.enum([
          '1° Eucaristia',
          'Crisma',
          'Catequizandos Adultos',
          'Catecúmenos Adultos',
          'Sementinha',
          'Pré-Eucaristia',
        ]),
      })

      const { segment } = classroomBodySchema.parse(request.params)

      const { classroomNames } = await getClassroomsNamesBySegment({ segment })

      reply.status(200).send(classroomNames)
    } catch (error) {
      reply.status(500).send(error)
    }
  }

  static async deleteClassroom(request: FastifyRequest, reply: FastifyReply) {
    try {
      const deleteBodySchema = z.object({
        classroomId: z.string().uuid(),
      })
      const { classroomId } = deleteBodySchema.parse(request.params)

      const { classroom } = await deleteClassroom({ classroomId })

      reply.status(200).send({
        message: 'Turma deletada com sucesso',
        classroom,
      })
    } catch (error) {
      reply.status(500).send(error)
    }
  }
}
