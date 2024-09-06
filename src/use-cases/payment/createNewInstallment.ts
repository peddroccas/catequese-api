import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createNewInstallment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const newInstallmentParamsSchema = z.object({
      catechizingId: z.string(),
    })
    const newInstallmentBodySchema = z.object({
      payedAt: z.coerce.date(),
      value: z.number(),
    })

    const { catechizingId } = newInstallmentParamsSchema.parse(request.params)
    const { payedAt, value } = newInstallmentBodySchema.parse(request.body)

    const payment = await prisma.payment.findFirst({
      where: { catechizing: { id: catechizingId } },
    })

    function isValueBiggestThenToBePaid() {
      if (value > payment!.toBePaid) {
        throw new Error('Value is biggest then to be paid')
      }
    }
    isValueBiggestThenToBePaid()

    await prisma.payment.updateMany({
      where: { catechizing: { id: catechizingId } },
      data: { toBePaid: payment!.toBePaid - value },
    })

    await prisma.installment.create({
      data: {
        paymentId: payment!.id,
        value,
        payedAt,
      },
    })
    return reply.status(201).send()
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao cadastrar nova parcela' })
  }
}
