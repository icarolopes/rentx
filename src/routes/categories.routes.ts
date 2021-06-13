import { Router } from 'express'
import { CreateCategoryUseCase } from '../modules/cars/useCases/CreateCategory/CreateCategoryUseCase'

// import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository'
import { PostgresCategoriesRepository } from '../modules/cars/repositories/PostgresCategoriesRepository'
import { createCategoryController } from '../modules/cars/useCases/CreateCategory'
import { listCategoriesController } from '../modules/cars/useCases/ListCategories'

const categoriesRoutes = Router()
const categoriesRepository = new PostgresCategoriesRepository()

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle(request, response)
})

categoriesRoutes.get('/', (request, response) => {
  return listCategoriesController.handle(request, response)
})

export { categoriesRoutes }
