import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getAllCatechists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const catechists = await prisma.catechist.findMany({
      select: {
        id: true,
        address: true,
        birthday: true,
        classroomId: true,
        name: true,
        phone: true,
        email: true,
        hasReceivedBaptism: true,
        hasReceivedConfirmation: true,
        hasReceivedEucharist: true,
        hasReceivedMarriage: true,
      },
      orderBy: { name: 'asc' },
    })

    reply.status(200).send(catechists)
  } catch (error) {
    reply.status(500).send(error)
  }
}
