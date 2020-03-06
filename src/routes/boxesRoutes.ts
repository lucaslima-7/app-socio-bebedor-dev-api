import { Router } from 'express'
import BoxesController from '../controllers/BoxesController'
import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

router.get('/', [checkJwt], BoxesController.getBoxes)
router.get('/count', [checkJwt], BoxesController.getBoxesCount)
router.get('/:id', [checkJwt], BoxesController.getBoxById)
router.post('/', [checkJwt], BoxesController.createBox)
router.put('/:id', [checkJwt], BoxesController.updateBox)
router.delete('/:id', [checkJwt], BoxesController.deleteBox)

export default router
