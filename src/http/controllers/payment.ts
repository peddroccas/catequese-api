import { createNewInstallment } from '@/use-cases/payment/createNewInstallment'
import { getPaymentByCatechizing } from '@/use-cases/payment/getPaymentByCatechizing'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export class payment {
  static async createNewInstallment(
    request: FastifyRequest,
    reply: FastifyReply
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

      await createNewInstallment({
        catechizingId,
        payedAt,
        value,
      })

      return reply.status(201).send('Parcela criada')
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao cadastrar nova parcela' })
    }
  }

  static async getByCatechizing(request: FastifyRequest, reply: FastifyReply) {
    try {
      const getPaymentParamsSchema = z.object({
        catechizingId: z.string(),
      })

      const { catechizingId } = getPaymentParamsSchema.parse(request.params)

      const { payment } = await getPaymentByCatechizing({ catechizingId })

      return reply.status(200).send(payment)
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao consultar parcelas' })
    }
  }
}
