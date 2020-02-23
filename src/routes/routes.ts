import { Router } from 'express'
import TeamsController from '../controllers/TeamsController'

const routes = Router()

routes.get('/', (req, res) => res.json('Socio Bebedor API'))
routes.get('/teams', TeamsController.getTeams)
routes.post('/teams', TeamsController.createTeam)

export default routes
