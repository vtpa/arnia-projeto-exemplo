import express from 'express'
import routes from './routes'
import { logger } from './middlewares/logger'

const app = express()

app.use(express.json())
app.use(logger)
app.use(routes)

export default app
