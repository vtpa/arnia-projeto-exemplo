import { Router } from 'express'
import * as Yup from 'yup'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { authConfig } from '../config/auth'

const router = Router()

router.post('/', async (req, res) => {
  const userSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(8),
  })

  try {
    const { email, password } = await userSchema.validate(req.body)
    const user = await User.findOne({ email }).exec()
    if (!user) {
      res.send({ message: `Email or password not match!` })
      return
    }

    const isThePasswordTheSame = await compare(password, user.password)
    if (!isThePasswordTheSame)
      res.send({ message: `Email or password not match!` })

    user.password = ''

    const token = jwt.sign({ sub: user.id }, authConfig.secret, {
      expiresIn: 24 * 60 * 60, // segundos em um 1 dia
    })

    res.send({ user, token })
  } catch (error) {
    const { errors, message } = error as Yup.ValidationError
    res.status(400).send({ validationErrors: errors, message })
  }
})

export default router
