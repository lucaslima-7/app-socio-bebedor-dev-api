import { Router } from 'express'
import TeamsController from '../controllers/TeamsController'
import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

router.get('/teams', [checkJwt], TeamsController.getTeams)
router.get('/teams/count', TeamsController.getTeamsCount)
router.get('/teams/:id', TeamsController.getTeamById)
router.post('/teams', TeamsController.createTeam)

export default router
