import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getAllCatechizing(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const catechizings = await prisma.catechizing.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        birthday: true,
        classroomId: true,
        hasReceivedBaptism: true,
        hasReceivedEucharist: true,
        hasReceivedMarriage: true,
        payments: true,
        parents: { select: { name: true, phone: true, kinship: true } },
      },
      orderBy: { name: 'asc' },
    })

    console.log(catechizings)
    reply.status(201).send(catechizings)
  } catch (error) {
    reply.status(500).send(error)
  }
}
