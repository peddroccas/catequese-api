import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function getPaymentByCatechizing(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getPaymentParamsSchema = z.object({
      catechizingId: z.string(),
    })

    const { catechizingId } = getPaymentParamsSchema.parse(request.params)

    const payment = await prisma.payment.findFirst({
      where: { catechizing: { id: catechizingId } },
      select: {
        installments: true,
        toBePaid: true,
        id: true,
      },
    })

    return reply.status(200).send(payment)
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao consultar parcelas' })
  }
}
