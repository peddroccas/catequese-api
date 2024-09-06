import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createNewCatechizing(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const newCatechizingBodySchema = z.object({
      name: z.string(),
      birthday: z.coerce.date(),
      address: z.string(),
      classroomId: z.string().uuid(),
      personWithSpecialNeeds: z.boolean(),
      hasReceivedBaptism: z.boolean(),
      hasReceivedEucharist: z.boolean(),
      hasReceivedMarriage: z.boolean(),
      parents: z.object({
        name: z.string(),
        phone: z.string(),
        kinship: z.string(),
      }),
    })

    const {
      name,
      address,
      birthday,
      classroomId,
      personWithSpecialNeeds,
      hasReceivedBaptism,
      hasReceivedEucharist,
      hasReceivedMarriage,
      parents,
    } = newCatechizingBodySchema.parse(request.body)

    const catechizing = await prisma.catechizing.create({
      data: {
        name,
        address,
        birthday,
        hasReceivedBaptism,
        hasReceivedEucharist,
        hasReceivedMarriage,
        personWithSpecialNeeds,
        classroomId,
        parents: {
          create: {
            name: parents.name,
            phone: parents.phone,
            kinship: parents.kinship,
          },
        },
        payments: {
          create: {
            toBePaid:
              (await prisma.classroom
                .findFirst({
                  select: { startedAt: true },
                  where: { id: classroomId },
                })
                .then((startedAt) => startedAt?.startedAt)) === 2023
                ? 150
                : 250,
          },
        },
      },
    })

    reply.status(201).send(catechizing)
  } catch (error) {
    reply.status(500).send({ error })
  }
}
