import { prisma } from '@/lib/prisma'

interface CreateNewInstallmentRequest {
  catechizingId: string
  payedAt: Date
  value: number
}
export async function createNewInstallment({
  catechizingId,
  payedAt,
  value,
}: CreateNewInstallmentRequest) {
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
}
