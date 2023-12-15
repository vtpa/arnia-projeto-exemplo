import yup, { ISchema } from 'yup'

export interface TypedRequest<
  Body extends ISchema<any, any, any, any> = any,
  Params extends ISchema<any, any, any, any> = any,
  Query extends ISchema<any, any, any, any> = any,
> {
  body: yup.InferType<Body>
  params: yup.InferType<Params>
  query: yup.InferType<Query>
}
