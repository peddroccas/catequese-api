import { createNewCatechizing } from '@/use-cases/catechizing/createNewCatechizing'
import { getCatechizingByClassroom } from '@/use-cases/catechizing/getCatechizingByClassroom'
import { getAllCatechizing } from '@/use-cases/catechizing/getAllCatechizing'
import { addCatechizingToClassroom } from '@/use-cases/catechizing/addCatechizingToClassroom'

export const CatechizingController = {
  createNewCatechizing,
  getCatechizingByClassroom,
  getAllCatechizing,
  addCatechizingToClassroom,
}
