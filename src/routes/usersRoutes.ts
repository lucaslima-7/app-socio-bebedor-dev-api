import { Router } from 'express'
import UsersController from '../controllers/UsersController'
import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

router.get('/', UsersController.getUsers)
router.get('/count', [checkJwt], UsersController.getUsersCount)
router.get('/:id', [checkJwt], UsersController.getUserById)
router.post('/', UsersController.createUser)
router.put('/', UsersController.verifyEmail)
router.delete('/:id', [checkJwt], UsersController.deleteUserById)

export default router
