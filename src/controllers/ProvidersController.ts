import { Response, Request } from 'express'
import { connect } from '../database'

class ProvidersController {
  private defaultLimit = 10;
  private defaultOffset = 0;
  private table = 'providers'

  constructor() {
    this.getProviders = this.getProviders.bind(this)
  }

  public async getProviders(req: Request, res: Response): Promise<Response> {
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
}

export default new ProvidersController()
