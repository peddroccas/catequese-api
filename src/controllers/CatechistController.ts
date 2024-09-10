import { createNewCatechist } from '@/use-cases/catechist/createNewCatechist'
import { addCatechistToClassroom } from '@/use-cases/catechist/addCatechistToClassroom'
import { getAllCatechists } from '@/use-cases/catechist/getAllCatechist'
import { updateCatechist } from '@/use-cases/catechist/updateCatechist'

export const CatechistController = {
  createNewCatechist,
  addCatechistToClassroom,
  getAllCatechists,
  updateCatechist,
}
