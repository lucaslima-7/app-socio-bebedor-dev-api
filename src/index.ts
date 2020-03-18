import express, { Application } from 'express'
import cors from 'cors'
// import authRoutes from './routes/authRoutes'
import teamsRoutes from './routes/teamsRoutes'
import providersRoutes from './routes/providersRoutes'
import productsRoutes from './routes/productsRoutes'
import boxesRoutes from './routes/boxesRoutes'
import helmet from 'helmet'
import serverless from 'serverless-http'

class App {
  public app: Application

  constructor () {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(helmet())
  }

  private routes (): void {
    // this.express.use('/', (req, res) => res.json('Socio Bebedor API'))
    // this.app.use('/auth', authRoutes)
    this.app.use('/teams', teamsRoutes)
    this.app.use('/boxes', boxesRoutes)
    this.app.use('/providers', providersRoutes)
    this.app.use('/products', productsRoutes)
  }
}

const app = new App().app

module.exports.handler = serverless(app)
export default app
