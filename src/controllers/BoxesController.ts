import { Response, Request } from 'express'
import { connect } from '../database'
import HttpException from '../handlers/HttpException'
import { CreateBox, UpdateBox } from '../interfaces/Boxes'

class BoxesController {
  private defaultLimit = 10;
  private defaultOffset = 0;
  private table = 'boxes'

  constructor () {
    this.getBoxesCount = this.getBoxesCount.bind(this)
    this.getBoxes = this.getBoxes.bind(this)
    this.getBoxById = this.getBoxById.bind(this)
    this.createBox = this.createBox.bind(this)
    this.updateBox = this.updateBox.bind(this)
  }

  public async getBoxesCount (req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const count = await conn.query('SELECT count(*) as TotalCount FROM ??', [this.table])
    const formattedCount = count[0][0].TotalCount
    return res.json({
      count: formattedCount
    })
  }

  public async getBoxes (req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const count = await conn.query('SELECT count(*) as TotalCount FROM ??', [this.table])
    const formattedCount = count[0][0].TotalCount
    const limit = req.query.limit ? parseInt(req.query.limit) : this.defaultLimit
    const offset = req.query.offset ? parseInt(req.query.offset) : this.defaultOffset
    const boxes = await conn.query(
      'SELECT * FROM ?? ORDER BY id ASC LIMIT ? OFFSET ?',
      [this.table, limit, offset > formattedCount ? formattedCount : offset]
    )
    return res.json({
      count: formattedCount,
      data: boxes[0]
    })
  }

  public async getBoxById (req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const id = parseInt(req.params.id)
    if (!id) {
      return HttpException.invalidId(res)
    }

    const box = await conn.query(
      'SELECT * FROM ?? WHERE id = ?',
      [this.table, id]
    )
    return res.json({
      data: box[0]
    })
  }

  public async createBox (req: Request, res: Response): Promise<Response> {
    const reqBody: CreateBox = req.body
    const conn = await connect()
    console.log(reqBody)
    await conn.query(
      'INSERT INTO ?? SET ?',
      [this.table, reqBody]
    )
    return res.json({
      message: 'Box Created'
    })
  }

  public async updateBox (req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const id = parseInt(req.params.id)
    if (!id) {
      return HttpException.invalidId(res)
    }
    const reqBody: UpdateBox = req.body
    console.log(reqBody)
    await conn.query(
      'UPDATE ?? SET ? WHERE id = ?',
      [this.table, reqBody, id]
    )
    return res.status(200).send({
      message: 'Updated Successfully'
    })
  }

  public async deleteBox (req: Request, res: Response): Promise<Response> {
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

export default new BoxesController()
