import { createNewCatechizing } from '@/use-cases/catechizing/createNewCatechizing'
import { getCatechizingByClassroom } from '@/use-cases/catechizing/getCatechizingByClassroom'
import { getAllCatechizing } from '@/use-cases/catechizing/getAllCatechizing'
import { addCatechizingToClassroom } from '@/use-cases/catechizing/addCatechizingToClassroom'
import { updateCatechizing } from '@/use-cases/catechizing/updateCatechizing'
import { deleteCatechizing } from '@/use-cases/catechizing/deleteCatechizing'
import { transferClassCatechizing } from '@/use-cases/catechizing/transferClassCatechizing'

export const CatechizingController = {
  createNewCatechizing,
  getCatechizingByClassroom,
  getAllCatechizing,
  addCatechizingToClassroom,
  updateCatechizing,
  deleteCatechizing,
  transferClassCatechizing,
}
