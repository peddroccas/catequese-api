import { createNewCatechist } from '@/use-cases/catechist/createNewCatechist'
import { addCatechistToClassroom } from '@/use-cases/catechist/addCatechistToClassroom'
import { getAllCatechists } from '@/use-cases/catechist/getAllCatechist'

export const CatechistController = {
  createNewCatechist,
  addCatechistToClassroom,
  getAllCatechists,
}
