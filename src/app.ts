import fastify from 'fastify'
import { appRoutes } from './routes'
import { fastifyCors } from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import {
  type ZodTypeProvider,
  validatorCompiler,
  serializerCompiler,
} from 'fastify-type-provider-zod'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

//Routes
app.register(appRoutes)
