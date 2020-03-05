import { Router } from 'express'
import ProvidersController from '../controllers/ProvidersController'
import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

router.get('/', [checkJwt], ProvidersController.getProviders)
router.get('/count', [checkJwt], ProvidersController.getProvidersCount)
router.get('/:id', [checkJwt], ProvidersController.getProviderById)
router.post('/', [checkJwt], ProvidersController.createProvider)
router.put('/:id', [checkJwt], ProvidersController.updateProvider)
router.delete('/:id', [checkJwt], ProvidersController.deleteProvider)

export default router
