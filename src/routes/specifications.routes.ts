import { Router } from 'express'
import { ensureauthenticated } from '../middlewares/ensureAuthenticated'

import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController'

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.use(ensureauthenticated)
specificationsRoutes.post('/', createSpecificationController.handle)

export { specificationsRoutes }
