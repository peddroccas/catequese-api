import { FastifyInstance } from 'fastify'
import { catechist } from '../controllers/catechist'

export async function catechistsRoutes(app: FastifyInstance) {
  app.patch('/signUp', catechist.signUp)
  app.post('/login', catechist.login)
  app.post('/catechists', catechist.createNew)
  app.patch('/catechists/transfer', catechist.transferClass)
  app.get('/catechists', catechist.getAll)
  app.get('/profile', catechist.profile)
  app.put('/catechists/:catechistId', catechist.update)
  app.delete('/catechists/:catechistId', catechist.delete)
}
