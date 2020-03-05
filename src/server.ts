import './config/env'
import app from './app'
// import * as jwt from 'jsonwebtoken'
// import { JWT_SECRET } from './config/config'

// const token = jwt.sign(
//   { username: 'Luquinhas' },
//   JWT_SECRET,
//   { expiresIn: '365days' }
// )

app.listen(3333, () => {
  console.log('Api rodando na porta 3333')
})
