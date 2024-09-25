import fastify from 'fastify'
import { appRoutes } from './routes'
import { fastifyCors } from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.register(fastifyCors, {
  origin: '*',
})
app.register(appRoutes)
