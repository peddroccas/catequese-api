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
      })

      const { roomNumber, segment } = classroomBodySchema.parse(request.body)

      await prisma.classroom.create({
        data: {
          roomNumber,
          segment,
        },
      })

      reply.status(201).send()
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao criar nova sala' + error })
    }
  }

  static async getClassroomByRoomNumber(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      const classroomBodySchema = z.object({
        roomNumber: z.coerce.number(),
      })

      const { roomNumber } = classroomBodySchema.parse(request.params)

      const classroomResponse = await prisma.classroom.findUnique({
        where: { roomNumber },
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

      const classroomNames: string[] = []
      classrooms.forEach((classroom) => {
        classroomNames.push(
          `Turma ${classroom.roomNumber} - ${classroom.catechists.map((catechist) => catechist.name).join(' e ')}`,
        )
      })

      reply.status(200).send(classroomNames)
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao consultar nome das salas' })
    }
  }

  static async getClassrooms(request: FastifyRequest, reply: FastifyReply) {
    try {
      const classroomBodySchema = z.object({
        roomNumber: z.coerce.number(),
      })

      const { roomNumber } = classroomBodySchema.parse(request.params)
      const classroom = await prisma.classroom.findMany({
        where: { roomNumber },
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
          roomNumber: true,
          catechists: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })

      reply.status(200).send(classroom)
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao consultar nome das salas' })
    }
  }
}
