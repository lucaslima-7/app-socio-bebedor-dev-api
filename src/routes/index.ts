import { Router } from 'express'
import authRoutes from './authRoutes'
import teamsRoutes from './teamsRoutes'

const routes = Router()

routes.get('/', (req, res) => res.json('Socio Bebedor API'))
routes.use('/auth', authRoutes)
routes.use('/teams', teamsRoutes)

export default routes
