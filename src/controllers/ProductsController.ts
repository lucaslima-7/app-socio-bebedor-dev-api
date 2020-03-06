import { Response, Request } from 'express'
import { connect } from '../database'
import HttpException from '../handlers/HttpException'
import { CreateProduct, UpdateProduct } from '../interfaces/Products'

class ProductsController {
  private defaultLimit = 10;
  private defaultOffset = 0;
  private table = 'products'

  constructor () {
    this.getProducts = this.getProducts.bind(this)
    this.getProductById = this.getProductById.bind(this)
    this.getProductsCount = this.getProductsCount.bind(this)
    this.createProduct = this.createProduct.bind(this)
    this.updateProduct = this.updateProduct.bind(this)
  }

  public async getProductsCount (req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const count = await conn.query('SELECT count(*) as TotalCount FROM ??', [this.table])
    const formattedCount = count[0][0].TotalCount
    return res.json({
      count: formattedCount
    })
  }

  public async getProducts (req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const count = await conn.query('SELECT count(*) as TotalCount FROM ??', [this.table])
    const formattedCount = count[0][0].TotalCount
    const limit = req.query.limit ? parseInt(req.query.limit) : this.defaultLimit
    const offset = req.query.offset ? parseInt(req.query.offset) : this.defaultOffset
    const products = await conn.query(
      'SELECT * FROM ?? ORDER BY id ASC LIMIT ? OFFSET ?',
      [this.table, limit, offset > formattedCount ? formattedCount : offset]
    )
    return res.json({
      count: formattedCount,
      data: products[0]
    })
  }

  public async getProductById (req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const id = parseInt(req.params.id)
    if (!id) {
      return HttpException.invalidId(res)
    }

    const product = await conn.query(
      'SELECT * FROM ?? WHERE id = ?',
      [this.table, id]
    )
    return res.json({
      data: product[0]
    })
  }

  public async createProduct (req: Request, res: Response): Promise<Response> {
    const reqBody: CreateProduct = req.body
    const conn = await connect()
    console.log(reqBody)
    await conn.query(
      'INSERT INTO ?? SET ?',
      [this.table, reqBody]
    )
    return res.json({
      message: 'Product Created'
    })
  }

  public async updateProduct (req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    const id = parseInt(req.params.id)
    if (!id) {
      return HttpException.invalidId(res)
    }
    const reqBody: UpdateProduct = req.body
    console.log(reqBody)
    await conn.query(
      'UPDATE ?? SET ? WHERE id = ?',
      [this.table, reqBody, id]
    )
    return res.status(200).send({
      message: 'Updated Successfully'
    })
  }

  public async deleteProduct (req: Request, res: Response): Promise<Response> {
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

export default new ProductsController()
