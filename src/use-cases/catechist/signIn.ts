import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { CatechistNotFoundError } from '../errors/catechist-not-found'

interface SignInRequest {
  email: string
  password: string
}

export async function signIn({ email, password }: SignInRequest) {
  // Busca o catequista pelo email
  const catechist = await prisma.catechist.findUnique({
    where: { email },
  })

  // Verifica se o catequista foi encontrado
  if (!catechist) {
    throw new CatechistNotFoundError()
  }

  // Compara a senha informada com o hash armazenado
  const isPasswordValid = await compare(password, catechist.password_hash!)

  // Se a senha for inválida, lança um erro
  if (!isPasswordValid) {
    throw new InvalidCredentialsError()
  }

  const { password_hash, ...loggedCatechist } = catechist
  // Retorna o catequista logado
  return { loggedCatechist }
}
