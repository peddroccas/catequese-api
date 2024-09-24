import { FastifyInstance } from 'fastify'
import { CatechistController } from '../controllers/CatechistController'

export async function catechistsRoutes(app: FastifyInstance) {
  app.patch('/signUp', CatechistController.signUp)
  app.post('/signIn', CatechistController.signIn)
  app.post('/catechists', CatechistController.createNewCatechist)
  app.patch('/catechists/transfer', CatechistController.transferClassCatechist)
  app.get('/catechists', CatechistController.getAllCatechists)
  app.get('/catechists/:id', CatechistController.getCatechist)
  app.put('/catechists/:catechistId', CatechistController.updateCatechist)
  app.delete('/catechists/:catechistId', CatechistController.deleteCatechist)
}
