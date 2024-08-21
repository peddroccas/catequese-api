import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma'

export class PaymentController {
  static async createNewInstallment(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    const newInstallmentBodySchema = z.object({
      payedAt: z.coerce.date(),
      value: z.number(),
    })

    const newInstallmentParamsSchema = z.object({
      catechizingId: z.string().uuid(),
    })

    const { catechizingId } = newInstallmentParamsSchema.parse(request.params)
    const { payedAt, value } = newInstallmentBodySchema.parse(request.body)

    try {
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
      console.error(error)
    }
  }
}
