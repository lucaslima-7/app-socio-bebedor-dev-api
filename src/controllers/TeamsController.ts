import { Request, Response } from 'express'
import { connect } from '../database'
import { Team } from '../interfaces/Team'

class TeamsController {
  defaultLimit = 10;
  defaultOffset = 0

  public async getTeams (req: Request, res: Response): Promise<Response> {
    console.log(this)
    const conn = await connect()
    const count = await conn.query('SELECT count(*) as TotalCount FROM teams')
    const formattedCount = count[0][0].TotalCount
    const { limit, offset } = req.query

    if (limit) {
      this.defaultLimit = limit
    }

    if (offset) {
      this.defaultOffset = offset
    }

    const teams = await conn.query('SELECT * FROM teams ORDER BY id ASC LIMIT ? OFFSET ?', [this.defaultLimit, this.defaultOffset])
    return res.json({
      count: formattedCount,
      data: teams[0]
    })
  }

  public async getTeamById (req: Request, res: Response): Promise<Response> {
    const id = req.params.id
    const conn = await connect()
    const team = await conn.query('SELECT * FROM teams WHERE id = ?', [id])
    return res.json(team[0])
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

// export async function getTeams (req: Request, res: Response): Promise<Response> {
//   const conn = await connect()
//   // Create a separate function for countTeams - Luquinhas
//   const count = await conn.query('SELECT count(*) as TotalCount FROM teams')
//   const formattedCount = count[0][0].TotalCount
//   const { limit, offset } = req.query
//   const formattedOffset = parseInt(offset ?? '0')
//   const teams = await conn.query(
//     'SELECT * FROM teams ORDER BY id ASC LIMIT ? OFFSET ?',
//     [parseInt(limit ?? '10'), formattedOffset > formattedCount ? formattedCount : formattedOffset]
//   )
//   return res.json({
//     count: formattedCount,
//     data: teams[0]
//   })
// }

export default new TeamsController()
