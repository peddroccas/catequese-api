import { prisma } from '@/lib/prisma'

interface GetPaymentByCatechizingRequest {
  catechizingId: string
}

export async function getPaymentByCatechizing({
  catechizingId,
}: GetPaymentByCatechizingRequest) {
  const payment = await prisma.payment.findFirst({
    where: { catechizing: { id: catechizingId } },
    select: {
      installments: true,
      toBePaid: true,
      id: true,
    },
  })

  return { payment }
}
