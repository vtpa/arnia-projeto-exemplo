import mongoose from 'mongoose'
import { databaseConfig } from '../config/database'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
mongoose.connect(databaseConfig.uri)

export { mongoose }
