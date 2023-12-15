import * as Yup from 'yup'
import { TypedRequest } from '../utils/typedRequest'
import { ICarDTO } from '../entities/ICar'

const carSchema = Yup.object<ICarDTO>({
  model: Yup.string().required(),
  year: Yup.number().positive().required(),
  color: Yup.string(),
  fuel: Yup.string().default('Flex'),
  brand: Yup.string().min(24).required(),
})

const carParamSchema = Yup.object({
  id: Yup.string().min(24).required(),
})

export namespace CreateCar {
  export type BodyType = TypedRequest<typeof carSchema>
  export const schema = Yup.object().shape({ body: carSchema })
}

export namespace UpdateCar {
  export type BodyType = TypedRequest<typeof carSchema>
  export type ParamType = TypedRequest<typeof carParamSchema>
  export const schema = Yup.object().shape({
    body: carSchema,
    params: carParamSchema,
  })
}

export namespace DeleteCar {
  export type ParamType = TypedRequest<typeof carParamSchema>
  export const schema = Yup.object().shape({
    params: carParamSchema,
  })
}
