import express, { Application } from 'express'
import cors from 'cors'
import routes from './routes/teamsRoutes'
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
    this.express.use(routes)
  }
}

export default new App().express
