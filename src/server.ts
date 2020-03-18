import './config/env'
import 'reflect-metadata'
import app from '.'
import { createConnection } from 'typeorm'
import path from 'path'

// import * as jwt from 'jsonwebtoken'
// import { JWT_SECRET } from './config/config'

// const token = jwt.sign(
//   { username: 'Luquinhas' },
//   JWT_SECRET,
//   { expiresIn: '365days' }
// )

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE
} = process.env

createConnection({
  type: 'mysql',
  host: MYSQL_HOST,
  port: 3306,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  entities: [
    path.join(__dirname, '/entity/*.ts')
  ],
  synchronize: false,
  logging: false
}).then(connection => {
  console.log('Banco Conectado', connection.isConnected)
  app.listen(3333, () => {
    console.log('Api rodando na porta 3333')
  })
}).catch(error => console.log(error))
