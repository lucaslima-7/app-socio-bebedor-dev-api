import { Request, Response } from 'express'
import { connect } from '../database'
import { TeamInterface } from '../interfaces/TeamInterface'
import HttpException from '../handlers/HttpException'
import TeamsException from '../handlers/TeamsExceptions'
import Team from '../models/Team'

class TeamsController {
  private defaultLimit = 10;
  private defaultOffset = 0;
  private table = 'teams'

  constructor () {
    this.getTeamsCount = this.getTeamsCount.bind(this)
    this.getTeams = this.getTeams.bind(this)
    this.getTeamById = this.getTeamById.bind(this)
    this.createTeam = this.createTeam.bind(this)
  }

  public async getTeamsCount (req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const count = await conn.query('SELECT count(*) as TotalCount FROM ??', [this.table])
    const formattedCount = count[0][0].TotalCount
    return res.json({
      count: formattedCount
    })
  }

  public async getTeams (req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const count = await conn.query('SELECT count(*) as TotalCount FROM ??', [this.table])
    const formattedCount = count[0][0].TotalCount
    const limit = req.query.limit ? parseInt(req.query.limit) : this.defaultLimit
    const offset = req.query.offset ? parseInt(req.query.offset) : this.defaultOffset
    const teams = await conn.query(
      'SELECT * FROM ?? ORDER BY id ASC LIMIT ? OFFSET ?',
      [this.table, limit, offset > formattedCount ? formattedCount : offset]
    )
    return res.json({
      count: formattedCount,
      data: teams[0]
    })
  }

  public async getTeamById (req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id)

    if (!id) {
      return TeamsException.invalidId(res)
    }

    const conn = await connect()
    const team = await conn.query('SELECT * FROM ?? WHERE id = ?', [this.table, id])
    return res.json({
      data: team[0]
    })
  }

  public async createTeam (req: Request, res: Response): Promise<Response> {
    const name: string = req.body.name
    const state: string = req.body.state
    const foundationDate: number = req.body.foundationDate

    console.log(name)

    if (!name) {
      return TeamsException.invalidName(res)
    }

    if (!state) {
      return TeamsException.invalidState(res)
    }

    if (!foundationDate) {
      return TeamsException.invalidFoundationDate(res)
    }

    try {
      const team = new Team(name, state, foundationDate)
      console.log(team)
      const conn = await connect()
      await conn.query('INSERT INTO ?? SET ?', [this.table, team])
      return res.json({
        message: 'Team Created'
      })
    } catch (error) {
      console.log(error)
      return HttpException.mySQLError(res, error)
    }
  }
}

export default new TeamsController()
