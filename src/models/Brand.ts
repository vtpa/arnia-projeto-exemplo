import { mongoose } from '../database'

const brandSchema = new mongoose.Schema({
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

export const Brand = mongoose.model('brand', brandSchema)
