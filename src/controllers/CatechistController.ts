import { createNewCatechist } from '@/use-cases/catechist/createNewCatechist'
import { transferClassCatechis } from '@/use-cases/catechist/transferClassCatechist'
import { getAllCatechists } from '@/use-cases/catechist/getAllCatechist'
import { updateCatechist } from '@/use-cases/catechist/updateCatechist'

export const CatechistController = {
  createNewCatechist,
  transferClassCatechis,
  getAllCatechists,
  updateCatechist,
}
