const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE
} = process.env

module.exports = {
  name: 'default',
  type: 'mysql',
  host: MYSQL_HOST,
  port: 3306,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  // eslint-disable-next-line no-path-concat
  entities: ['src/entity/*.ts'],
  synchronize: true,
  logging: false
}
