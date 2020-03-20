import express, { Application } from 'express'
import './config/env'
import 'reflect-metadata'
import cors from 'cors'
import colors from 'colors/safe'
// import authRoutes from './routes/authRoutes'
import teamsRoutes from './routes/teamsRoutes'
import helmet from 'helmet'
import serverless from 'serverless-http'
import { createConnection, Connection } from 'typeorm'

// import * as jwt from 'jsonwebtoken'
// import { JWT_SECRET } from './config/config'

// const token = jwt.sign(
//   { username: 'Luquinhas' },
//   JWT_SECRET,
//   { expiresIn: '365days' }
// )

class App {
  public app: Application

  constructor () {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.app.set('port', process.env.PORT ?? 3333)
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(helmet())
  }

  private routes (): void {
    // this.express.use('/', (req, res) => res.json('Socio Bebedor API'))
    // this.app.use('/auth', authRoutes)
    this.app.use('/teams', teamsRoutes)
  }

  public start (): void {
    this.app.listen(this.app.get('port'), () => {
      console.log(colors.blue(`Api rodando na porta ${this.app.get('port')}`))
    })
  }

  public async connection (): Promise<Connection> {
    const connection = await createConnection()
    console.log(colors.green('Banco Conectado'))
    return connection
  }
}

const app = new App()
app.connection().then(() => {
  app.start()
})

module.exports.handler = serverless(app.app)
