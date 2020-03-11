import { Response } from 'express'

class HttpException extends Error {
  public mySQLError (res: Response, error): Response {
    return res.status(400).send(
      {
        error: {
          message: error.message,
          code: error.code
        }
      })
  }
}

export default new HttpException()
