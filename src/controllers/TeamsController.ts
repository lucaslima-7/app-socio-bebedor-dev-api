import { Request, Response } from 'express'
import { connect } from '../database'
import { Team } from '../interface/Team'

class TeamsController {
  public async getTeams (req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const teams = await conn.query('SELECT * FROM teams')
    return res.json(teams[0])
  }

  public async createTeam (req: Request, res: Response): Promise<Response> {
    const reqBody: Team = req.body
    const conn = await connect()
    await conn.query('INSERT INTO teams SET ?', [reqBody])
    console.log(reqBody)
    return res.json({
      message: 'Team Created'
    })
  }
}

export default new TeamsController()
