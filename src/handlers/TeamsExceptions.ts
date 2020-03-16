import { Response } from 'express'

class TeamsExceptions extends Error {
  public invalidId (res: Response): Response {
    return res.status(400).send({ error: 'Id is invalid' })
  }
}

export default new TeamsExceptions()
