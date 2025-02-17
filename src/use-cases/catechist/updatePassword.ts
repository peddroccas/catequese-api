import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface UpdatePasswordRequest {
  catechistId: string
  password: string
}

export async function updatePassword({
  catechistId,
  password,
}: UpdatePasswordRequest) {
  const password_hash = await hash(password, 6)
  const catechist = await prisma.catechist.update({
    where: { id: catechistId },
    data: {
      password_hash,
    },
  })
  return { catechist }
}
