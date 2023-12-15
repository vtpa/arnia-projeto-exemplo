/* eslint-disable @typescript-eslint/consistent-type-imports */
import { mongoose } from '../database'
import { ICar } from '../entities/ICar'

const carSchema = new mongoose.Schema<ICar>({
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  color: String,
  fuel: {
    type: String,
    default: 'Flex',
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'brand',
  },
})

export const Car = mongoose.model<ICar>('car', carSchema)
