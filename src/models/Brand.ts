import { mongoose } from '../database'
import { IBrand } from '../entities/IBrand'

const brandSchema = new mongoose.Schema<IBrand>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

export const Brand = mongoose.model<IBrand>('brand', brandSchema)
