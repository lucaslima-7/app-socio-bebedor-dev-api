import { Response } from 'express'

class TeamsExceptions extends Error {
  public invalidId (res: Response): Response {
    return res.status(400).send({ error: 'Id is invalid' })
  }

  public invalidFoundationDate (res: Response): Response {
    return res.status(400).send({
      error: {
        message: 'foundationDate is invalid',
        code: 'INVALID_OR_MISSING_BODY'
      }
    })
  }

  public invalidName (res: Response): Response {
    return res.status(400).send({
      error: {
        message: 'name is invalid',
        code: 'INVALID_OR_MISSING_BODY'
      }
    })
  }

  public invalidState (res: Response): Response {
    return res.status(400).send({
      error: {
        message: 'state is invalid',
        code: 'INVALID_OR_MISSING_BODY'
      }
    })
  }
}

export default new TeamsExceptions()
