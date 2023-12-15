export interface IBrand {
  _id: string
  title: string
  description?: string
  createdAt: Date
  __v: number
}

export interface IBrandDTO {
  title: string
  description?: string
}
