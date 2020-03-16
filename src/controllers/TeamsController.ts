import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Teams from '../entity/Teams'
import TeamsExceptions from '../handlers/TeamsExceptions'
import HttpException from '../handlers/HttpException'

class TeamsController {
  private defaultLimit = 10;
  private defaultOffset = 0

  constructor () {
    this.getTeams = this.getTeams.bind(this)
  }

  public async getTeams (req: Request, res: Response): Promise<Response> {
    const limit = req.query.limit ? parseInt(req.query.limit) : this.defaultLimit
    const offset = req.query.offset ? parseInt(req.query.offset) : this.defaultOffset
    const teamRepository = getRepository(Teams)
    const { count } = await teamRepository.createQueryBuilder().select('COUNT(*)', 'count').getRawOne()
    const teams = await teamRepository.find({
      skip: offset,
      take: limit
    })
    return res.json({
      count: parseInt(count),
      data: teams
    })
  }

  public async getTeamsCount (req: Request, res: Response): Promise<Response> {
    const teamRepository = getRepository(Teams)
    const { count } = await teamRepository.createQueryBuilder().select('COUNT(*)', 'count').getRawOne()
    return res.json({
      count: parseInt(count)
    })
  }

  public async getTeamById (req: Request, res: Response): Promise<Response> {
    const teamRepository = getRepository(Teams)
    const id = parseInt(req.params.id)
    if (!id) {
      return TeamsExceptions.invalidId(res)
    }

    const [team] = await teamRepository.findByIds([id])
    return res.json({
      data: team
    })
  }

  public async deleteTeamById (req: Request, res: Response): Promise<Response> {
    const teamRepository = getRepository(Teams)
    const id = parseInt(req.params.id)
    if (!id) {
      return TeamsExceptions.invalidId(res)
    }
    await teamRepository.delete({ id })
    return res.status(200).send({
      message: 'Time deletado com sucesso!'
    })
  }

  public async createTeam (req: Request, res: Response): Promise<Response> {
    const { name, state, foundationDate } = req.body
    const team = new Teams()
    team.name = name
    team.state = state
    team.foundationDate = team.convertToDateTime(foundationDate)
    try {
      const errors = await team.validateTeam(team)
      if (errors.length > 0) {
        return res.json({
          message: 'Ocorreram os seguintes erros',
          errors
        })
      } else {
        const teamRepository = getRepository(Teams)
        const alreadyHave = await teamRepository.findOne({ name, state })
        if (alreadyHave) {
          return res.status(400).send({
            message: 'Já existe um time informado na cidade informada'
          })
        } else {
          await teamRepository.save(team)
          return res.status(200).send({
            message: 'Time criado com sucesso'
          })
        }
      }
    } catch (error) {
      console.log(error)
      return HttpException.mySQLError(res, error)
    }
  }

  public async updateTeamById (req: Request, res: Response): Promise<Response> {
    const { name } = req.body
    const id = parseInt(req.params.id)

    if (!id) {
      return TeamsExceptions.invalidId(res)
    }

    const team = new Teams()
    team.name = name
    try {
      const errors = await team.validateTeam(team)
      if (errors.length > 0) {
        return res.status(400).send({
          message: 'Ocorreram os seguintes erros',
          errors
        })
      } else {
        const teamRepository = getRepository(Teams)
        const teamToUpdate = await teamRepository.findOne({ id })
        if (teamToUpdate) {
          teamToUpdate.name = name
          await teamRepository.save(teamToUpdate)
          return res.status(200).send({
            message: 'Time atualizado com sucesso'
          })
        } else {
          return res.status(400).send({
            message: 'O time informado não foi encontrado'
          })
        }
      }
    } catch (error) {
      console.log(error)
      return HttpException.mySQLError(res, error)
    }
  }
}

export default new TeamsController()
