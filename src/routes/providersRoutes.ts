import { Router } from 'express'
import ProvidersController from '../controllers/ProvidersController'
import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

router.get('/providers', [checkJwt], ProvidersController.getProviders)

export default router
