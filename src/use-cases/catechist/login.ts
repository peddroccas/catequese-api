import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface loginRequest {
  email: string
  password: string
}

export async function login({ email, password }: loginRequest) {
  // Busca o catequista pelo email
  const catechist = await prisma.catechist.findUnique({
    where: { email },
  })

  // Verifica se o catequista foi encontrado
  if (!catechist) {
    throw new InvalidCredentialsError()
  }

  // Compara a senha informada com o hash armazenado
  const doesPasswordMatches = await compare(password, catechist.password_hash!)

  // Se a senha for inválida, lança um erro
  if (!doesPasswordMatches) {
    throw new InvalidCredentialsError()
  }

  return { catechist }
}
