import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface signUpRequest {
  email: string
  password: string
}

export async function signUp({ email, password }: signUpRequest) {
  const password_hash = await hash(password, 6)

  const catechist = await prisma.catechist.update({
    where: { email },
    data: {
      password_hash,
    },
  })

  return { message: 'Catequista cadastrado com sucesso' }
}
