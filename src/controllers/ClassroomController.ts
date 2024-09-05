import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

export class ClassroomController {
  static async createNewClassroom(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      const classroomBodySchema = z.object({
        roomNumber: z.number(),
        segment: z.string(),
        catechistsId: z.string().uuid().array(),
        startedAt: z.number().min(2023),
      })

      const { roomNumber, segment, catechistsId, startedAt } =
        classroomBodySchema.parse(request.body)

      await prisma.classroom.create({
        data: {
          roomNumber,
          segment,
          catechists: { connect: catechistsId.map((id) => ({ id })) },
          startedAt,
        },
      })

      reply.status(201).send()
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao criar nova sala' + error })
    }
  }

  static async getClassroomById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const classroomBodySchema = z.object({
        classroomId: z.string().uuid(),
      })

      const { classroomId } = classroomBodySchema.parse(request.params)

      const classroomResponse = await prisma.classroom.findUnique({
        where: { id: classroomId },
        select: {
          catechizings: {
            select: {
              id: true,
              name: true,
              birthday: true,
              payments: true,
              hasReceivedBaptism: true,
              personWithSpecialNeeds: true,
            },
          },
          id: true,
          segment: true,
          startedAt: true,
          roomNumber: true,
          catechists: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })

      reply.status(200).send(classroomResponse)
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao consultar sala pelo número' })
    }
  }

  static async getClassroomsNames(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      const classrooms = await prisma.classroom.findMany({
        select: {
          id: true,
          roomNumber: true,
          startedAt: true,
          catechists: {
            select: {
              name: true,
            },
          },
        },
      })

      const classroomNames: {
        id: string
        classroomName: string
        startedAt: number
      }[] = []
      classrooms.forEach((classroom) => {
        classroomNames.push({
          id: classroom.id,
          classroomName: `Turma ${classroom.roomNumber} - ${classroom.catechists.map((catechist) => catechist.name).join(' e ')}`,
          startedAt: classroom.startedAt,
        })
      })

      reply.status(200).send(classroomNames)
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao consultar nome das salas' })
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

      const classrooms = await prisma.classroom.findMany({
        where: { segment },
        select: {
          id: true,
          roomNumber: true,
          catechists: {
            select: {
              name: true,
            },
          },
        },
      })

      const classroomNames: {
        id: string
        classroomName: string
      }[] = []
      classrooms.forEach((classroom) => {
        classroomNames.push({
          id: classroom.id,
          classroomName: `Turma ${classroom.roomNumber} - ${classroom.catechists.map((catechist) => catechist.name).join(' e ')}`,
        })
      })

      reply.status(200).send(classroomNames)
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao consultar nome das salas' })
    }
  }
}
