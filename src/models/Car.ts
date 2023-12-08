import { mongoose } from '../database'

const carSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: new Date(),
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'brand',
  },
})

export const Car = mongoose.model('car', carSchema)
