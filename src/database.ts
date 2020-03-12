// import { createPool } from 'mysql2/promise'
import { createConnection } from 'typeorm'
import path from 'path'
import Teste from './entity/Teste'

export async function connect () {
  const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE
  } = process.env

  const connection = await createConnection({
    type: 'mysql',
    host: MYSQL_HOST,
    port: 3306,
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    entities: [
      Teste
    ],
    synchronize: true,
    logging: false
  })

  return connection
}
