import express, { Application } from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import teamsRoutes from './routes/teamsRoutes'
import providersRoutes from './routes/providersRoutes'
import productsRoutes from './routes/productsRoutes'
import boxesRoutes from './routes/boxesRoutes'
import helmet from 'helmet'

class App {
  public express: Application

  constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(helmet())
  }

  private routes (): void {
    // this.express.use('/', (req, res) => res.json('Socio Bebedor API'))
    this.express.use('/auth', authRoutes)
    this.express.use('/teams', teamsRoutes)
    this.express.use('/boxes', boxesRoutes)
    this.express.use('/providers', providersRoutes)
    this.express.use('/products', productsRoutes)
  }
}

export default new App().express
