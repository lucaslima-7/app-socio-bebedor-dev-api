// import { createPool } from 'mysql2/promise'
import { createConnection } from 'typeorm'
import path from 'path'

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
      path.join(__dirname, '/entity/*.ts')
    ],
    synchronize: true,
    logging: false
  })
  console.log('Banco Conectado', connection.isConnected)

  return connection
}
