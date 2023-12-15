export interface ICar {
  _id: string
  model: string
  year: number
  color?: string
  fuel: string
  image?: string
  brand?: string
  createdAt: Date
  __v: number
}

export interface ICarDTO {
  model: string
  year: number
  color?: string
  fuel: string
  brand: string
}
