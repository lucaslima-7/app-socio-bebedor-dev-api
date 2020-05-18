import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'

export const checkJwt = (req: Request, res: Response, next: NextFunction): Response | undefined => {
  let token = req.headers['x-access-token'] as string || req.headers.authorization
  const JWT_SECRET = `${process.env.JWT_SECRET}`

  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length)
    }

    try {
      const jwtPayload = jwt.verify(token, JWT_SECRET)
      res.locals.jwtPayload = jwtPayload
      next()
    } catch (error) {
      return res.status(401).send({
        message: 'Invalid Token'
      })
    }
  } else {
    return res.status(403).send({
      message: 'Unauthorized'
    })
  }
}
