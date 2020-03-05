import { Router } from 'express'
import TeamsController from '../controllers/TeamsController'
import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

router.get('/', [checkJwt], TeamsController.getTeams)
router.get('/count', TeamsController.getTeamsCount)
router.get('/:id', TeamsController.getTeamById)
router.post('/', TeamsController.createTeam)

export default router
