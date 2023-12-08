import { Router } from 'express'
import * as Yup from 'yup'
import { hash } from 'bcrypt'
import { User } from '../models/User'

const router = Router()

router.get('/', async (req, res) => {
  const users = await User.find()
  res.send(users)
})

router.post('/', async (req, res) => {
  const userSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
  })
  try {
    const user = await userSchema.validate(req.body)
    user.password = await hash(user.password, 8)
    const newUser = await new User(user).save()
    res.send(newUser)
  } catch (error) {
    const { errors, message } = error as Yup.ValidationError
    res.status(400).send({ validationErrors: errors, message })
  }
})

router.delete('/:id', async (req, res) => {
  const userParamSchema = Yup.object({
    id: Yup.string().required(),
  })
  try {
    const { id } = await userParamSchema.validate(req.params)
    const user = await User.findByIdAndDelete(id).exec()
    if (!user) {
      return res.send({ message: `User with id ${id} was not found!` })
    }
    res.sendStatus(204)
  } catch (error) {
    const { errors, message } = error as Yup.ValidationError
    res.status(400).send({ validationErrors: errors, message })
  }
})

export default router
