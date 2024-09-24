import { prisma } from '@/lib/prisma'

interface hasSetPasswordRequest {
  email: string
}

export async function hasSetPassword({ email }: hasSetPasswordRequest) {
  const catechist = await prisma.catechist.findUnique({
    where: { email },
    select: {
      password_hash: true,
    },
  })

  const hasSetPassowrd = Boolean(catechist?.password_hash)
  return { hasSetPassowrd }
}
