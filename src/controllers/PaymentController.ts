import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma'

export class PaymentController {
  static async createNewInstallment(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      const newInstallmentBodySchema = z.object({
        payedAt: z.coerce.date(),
        value: z.number(),
      })

      const newInstallmentParamsSchema = z.object({
        catechizingId: z.string().uuid(),
      })

      const { catechizingId } = newInstallmentParamsSchema.parse(request.params)
      const { payedAt, value } = newInstallmentBodySchema.parse(request.body)

      const payment = await prisma.payment.findUnique({
        where: { catechizing_id: catechizingId },
      })

      function isValueBiggestThenToBePaid() {
        if (value > payment!.toBePaid) {
          throw new Error('Value is biggest then to be paid')
        }
      }
      isValueBiggestThenToBePaid()

      await prisma.payment.update({
        where: { catechizing_id: catechizingId },
        data: { toBePaid: payment!.toBePaid - value },
      })

      await prisma.installment.create({
        data: {
          payment_id: payment!.id,
          value,
          payedAt,
        },
      })
      return reply.status(201).send()
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao cadastrar nova parcela' })
    }
  }

  static async getPaymentByCatechizing(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      const newInstallmentParamsSchema = z.object({
        catechizingName: z.string().uuid(),
      })

      const { catechizingName } = newInstallmentParamsSchema.parse(
        request.params,
      )

      const payment = await prisma.payment.findFirst({
        where: { catechizing: { name: catechizingName } },
        select: {
          installments: true,
          toBePaid: true,
          id: true,
        },
      })

      return reply.status(200).send(payment)
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao cadastrar nova parcela' })
    }
  }
}
