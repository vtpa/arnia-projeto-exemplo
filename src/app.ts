import express from 'express'
import routes from './routes'
import path from 'path'
import { logger } from './middlewares/logger'

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'tmp', 'uploads')))
app.use(logger)
app.use(routes)

export default app
