import { Response, Request } from 'express'
import { connect } from '../database'
import HttpException from '../handlers/HttpException'
import { CreateProvider, UpdateProvider } from '../interfaces/Providers'

class ProvidersController {
  private defaultLimit = 10;
  private defaultOffset = 0;
  private table = 'providers'

  constructor () {
    this.getProviders = this.getProviders.bind(this)
    this.getProviderById = this.getProviderById.bind(this)
    this.getProvidersCount = this.getProvidersCount.bind(this)
    this.createProvider = this.createProvider.bind(this)
    this.updateProvider = this.updateProvider.bind(this)
  }

  public async getProvidersCount (req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const count = await conn.query('SELECT count(*) as TotalCount FROM ??', [this.table])
    const formattedCount = count[0][0].TotalCount
    return res.json({
      count: formattedCount
    })
  }

  public async getProviders (req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const count = await conn.query('SELECT count(*) as TotalCount FROM ??', [this.table])
    const formattedCount = count[0][0].TotalCount
    const limit = req.query.limit ? parseInt(req.query.limit) : this.defaultLimit
    const offset = req.query.offset ? parseInt(req.query.offset) : this.defaultOffset
    const providers = await conn.query(
      'SELECT * FROM ?? ORDER BY id ASC LIMIT ? OFFSET ?',
      [this.table, limit, offset > formattedCount ? formattedCount : offset]
    )
    return res.json({
      count: formattedCount,
      data: providers[0]
    })
  }

  public async getProviderById (req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const id = parseInt(req.params.id)
    if (!id) {
      return HttpException.invalidId(res)
    }

    const provider = await conn.query(
      'SELECT * FROM ?? WHERE id = ?',
      [this.table, id]
    )
    return res.json({
      data: provider[0]
    })
  }

  public async createProvider (req: Request, res: Response): Promise<Response> {
    const reqBody: CreateProvider = req.body
    const conn = await connect()
    console.log(reqBody)
    await conn.query(
      'INSERT INTO ?? SET ?',
      [this.table, reqBody]
    )
    return res.json({
      message: 'Team Created'
    })
  }

  public async updateProvider (req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const id = parseInt(req.params.id)
    if (!id) {
      return HttpException.invalidId(res)
    }
    const reqBody: UpdateProvider = req.body
    console.log(reqBody)
    await conn.query(
      'UPDATE ?? SET ? WHERE id = ?',
      [this.table, reqBody, id]
    )
    return res.status(200).send({
      message: 'Updated Successfully'
    })
  }

  public async deleteProvider (req: Request, res: Response): Promise<Response> {
    const command = 'active = 0'
    const conn = await connect()
    const id = parseInt(req.params.id)
    if (!id) {
      return HttpException.invalidId(res)
    }
    await conn.query(
      'UPDATE ?? SET ? WHERE id = ?',
      [this.table, command, id]
    )
    return res.status(200)
  }
}

export default new ProvidersController()
