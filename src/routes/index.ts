import { Router } from 'express'

import carsRoutes from './cars.routes'
import brandsRoutes from './brands.routes'
import usersRoutes from './users.routes'
import authRoutes from './auth.routes'

const routes = Router()

routes.use('/cars', carsRoutes)
routes.use('/brands', brandsRoutes)
routes.use('/users', usersRoutes)
routes.use('/auth', authRoutes)

export default routes
