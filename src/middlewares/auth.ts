import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { authConfig } from '../config/auth'

export function auth(
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | undefined {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({ error: 'No token provided!' })
  }

  const tokenParts = authHeader.split(' ')

  if (tokenParts.length !== 2) {
    return res.status(401).send({ error: 'Token error!' })
  }

  const [tokenSchema, token] = tokenParts

  if (tokenSchema !== 'Bearer') {
    return res.status(401).send({ error: 'Token error!' })
  }

  jwt.verify(token, authConfig.secret, (error, decoded) => {
    if (error || !decoded) {
      return res.status(401).send({ error: 'Invalid Token!' })
    }

    req.body.userId = decoded.sub as string
    next()
  })
}
