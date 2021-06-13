import { Router } from 'express'
import { CreateCategoryUseCase } from '../modules/cars/useCases/CreateCategory/CreateCategoryUseCase'

// import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository'
import { PostgresCategoriesRepository } from '../modules/cars/repositories/PostgresCategoriesRepository'
import { createCategoryController } from '../modules/cars/useCases/CreateCategory'

const categoriesRoutes = Router()
const categoriesRepository = new PostgresCategoriesRepository()

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle(request, response)
})

categoriesRoutes.get('/', (request, response) => {
  const all = categoriesRepository.list()
  return response.status(200).json(all)
})

export { categoriesRoutes }
