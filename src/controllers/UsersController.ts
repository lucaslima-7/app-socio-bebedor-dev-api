import { Response, Request } from 'express'
import { connect } from '../database'

class UsersController {
  public async getAllUsers (req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const teams = await conn.query('SELECT * FROM users')
    return res.json(teams[0])
  }

  // public async getUserById (req: Request, res: Response): Promise<Response> {
  //   const conn = await connect()

  // }
}

export default new UsersController()
