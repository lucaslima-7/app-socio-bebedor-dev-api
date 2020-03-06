import { Router } from 'express'
import ProductsController from '../controllers/ProductsController'
import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

router.get('/', [checkJwt], ProductsController.getProducts)
router.get('/count', [checkJwt], ProductsController.getProductsCount)
router.get('/:id', [checkJwt], ProductsController.getProductById)
router.post('/', [checkJwt], ProductsController.createProduct)
router.put('/:id', [checkJwt], ProductsController.updateProduct)
router.delete('/:id', [checkJwt], ProductsController.deleteProduct)

export default router
