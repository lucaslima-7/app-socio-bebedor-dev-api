import { Response } from 'express'

class HttpException extends Error {
  public mySQLError (res: Response, error: Error): Response {
    return res.status(400).send(
      {
        error: {
          message: error.message
        }
      })
  }
}

export default new HttpException()
