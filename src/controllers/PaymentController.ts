import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma'

export class PaymentController {
  static async createNewInstallment(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      const newInstallmentParamsSchema = z.object({
        catechizingName: z.string(),
      })
      const newInstallmentBodySchema = z.object({
        payedAt: z.coerce.date(),
        value: z.number(),
      })

      const { catechizingName } = newInstallmentParamsSchema.parse(
        request.params,
      )
      const { payedAt, value } = newInstallmentBodySchema.parse(request.body)

      const payment = await prisma.payment.findFirst({
        where: { catechizing: { name: catechizingName } },
      })

      function isValueBiggestThenToBePaid() {
        if (value > payment!.toBePaid) {
          throw new Error('Value is biggest then to be paid')
        }
      }
      isValueBiggestThenToBePaid()

      await prisma.payment.updateMany({
        where: { catechizing: { name: catechizingName } },
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
      const getPaymentParamsSchema = z.object({
        catechizingName: z.string(),
      })

      const { catechizingName } = getPaymentParamsSchema.parse(request.params)

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
      reply.status(500).send({ error: 'Erro ao consultar parcelas' })
    }
  }
}
