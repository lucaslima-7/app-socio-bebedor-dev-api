import { createPool } from 'mysql2/promise'

export async function connect () {
  const connection = await createPool({
    host: 'socio-bebedor-dev-instance.cl7ppavk5brt.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'socio_2020#',
    database: 'socio_bebedor_dev',
    connectTimeout: 5000,
    connectionLimit: 10
  })
  return connection
}
