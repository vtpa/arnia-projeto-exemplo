import { ValidationError } from 'yup'
import { NextFunction, Request, Response } from 'express'

export default (schema: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(
        {
          body: req.body,
          query: req.query,
          params: req.params,
        },
        { strict: true, abortEarly: false }
      )

      next()
    } catch (error) {
      const { name, message, errors } = error as ValidationError
      res.status(406).send({ name, message, errors })
    }
  }
