import { Router } from 'express'

import { CreatespecificationService } from '../modules/cars/services/CreateSpecificationService'
import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationsRepository'

const specificationsRoutes = Router()

const specificationsRepository = new SpecificationsRepository()

specificationsRoutes.post('/', (request, response) => {
  const { name, description } = request.body
  const createSpecificationService = new CreatespecificationService(
    specificationsRepository
  )

  createSpecificationService.execute({ name, description })

  return response.status(201).send()
})

export { specificationsRoutes }