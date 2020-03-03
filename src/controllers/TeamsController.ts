import { Request, Response } from 'express'
import { connect } from '../database'
import { Team } from '../interfaces/Team'
import HttpException from '../handlers/HttpException'

class TeamsController {
  private defaultLimit = 10;
  private defaultOffset = 0;
  private database = 'teams'

  constructor () {
    this.getTeamsCount = this.getTeamsCount.bind(this)
    this.getTeams = this.getTeams.bind(this)
    this.getTeamById = this.getTeamById.bind(this)
    this.createTeam = this.createTeam.bind(this)
  }

  public async getTeamsCount (req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const count = await conn.query('SELECT count(*) as TotalCount FROM ??', [this.database])
    const formattedCount = count[0][0].TotalCount
    return res.json({
      count: formattedCount
    })
  }

  public async getTeams (req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const count = await conn.query('SELECT count(*) as TotalCount FROM ??', [this.database])
    const formattedCount = count[0][0].TotalCount
    const limit = req.query.limit ? parseInt(req.query.limit) : this.defaultLimit
    const offset = req.query.offset ? parseInt(req.query.offset) : this.defaultOffset
    const teams = await conn.query(
      'SELECT * FROM ?? ORDER BY id ASC LIMIT ? OFFSET ?',
      [this.database, limit, offset > formattedCount ? formattedCount : offset]
    )
    return res.json({
      count: formattedCount,
      data: teams[0]
    })
  }

  public async getTeamById (req: Request, res: Response): Promise<Response> {
    console.log('Entrei aqui')
    const id = parseInt(req.params.id)

    if (!id) {
      return HttpException.invalidId(res)
    }

    const conn = await connect()
    const team = await conn.query('SELECT * FROM ?? WHERE id = ?', [this.database, id])
    return res.json(team[0])
  }

  public async createTeam (req: Request, res: Response): Promise<Response> {
    const reqBody: Team = req.body
    const conn = await connect()
    await conn.query('INSERT INTO ?? SET ?', [this.database, reqBody])
    console.log(reqBody)
    return res.json({
      message: 'Team Created'
    })
  }
}

export default new TeamsController()
