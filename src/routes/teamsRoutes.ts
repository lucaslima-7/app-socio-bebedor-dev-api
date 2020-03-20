import { Router } from 'express'
import TeamsController from '../controllers/TeamsController'
import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

router.get('/', TeamsController.getTeams)
router.get('/count', [checkJwt], TeamsController.getTeamsCount)
router.get('/:id', [checkJwt], TeamsController.getTeamById)
router.delete('/:id', [checkJwt], TeamsController.deleteTeamById)
router.post('/', [checkJwt], TeamsController.createTeam)
router.put('/:id', [checkJwt], TeamsController.updateTeamById)

export default router
