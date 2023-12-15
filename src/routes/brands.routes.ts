import { Router } from 'express'
import * as Yup from 'yup'
import { Brand } from '../models/Brand'
import { auth } from '../middlewares/auth'
import { IBrandDTO } from '../entities/IBrand'

const router = Router()

router.use(auth)

router.get('/', async (req, res) => {
  const brands = await Brand.find()
  res.send(brands)
})

router.get('/:id', async (req, res) => {
  const brandParamSchema = Yup.object({
    id: Yup.string().required(),
  })

  try {
    const { id } = await brandParamSchema.validate(req.params)
    const brand = await Brand.findById(id).exec()
    if (!brand) {
      return res.send({ message: `Brand with id ${id} was not found!` })
    }
    res.send(brand)
  } catch (error) {
    const { errors, message } = error as Yup.ValidationError
    res.status(400).send({ validationErrors: errors, message })
  }
})

router.post('/', auth, async (req, res) => {
  const brandSchema = Yup.object({
    title: Yup.string().required(),
    description: Yup.string(),
  })

  try {
    const brand: IBrandDTO = await brandSchema.validate(req.body)
    const newBrand = await new Brand(brand).save()
    res.status(201).send(newBrand)
  } catch (error) {
    const { errors } = error as Yup.ValidationError
    res.status(400).send({ validationErrors: errors })
  }
})

router.put('/:id', auth, async (req, res) => {
  const brandParamSchema = Yup.object({
    id: Yup.string().required(),
  })
  const brandSchema = Yup.object({
    title: Yup.string().required(),
    description: Yup.string(),
  })
  try {
    const brand = await brandSchema.validate(req.body)
    const { id } = await brandParamSchema.validate(req.params)

    const brandToUpdate = await Brand.findByIdAndUpdate(id, brand).exec()
    if (!brandToUpdate) {
      res.status(204).send({ message: `Brand with id ${id} was not found!` })
    }
    const updatedBrand = await Brand.findById(id).exec()
    if (!updatedBrand) {
      res.status(204).send({ message: `Brand with id ${id} was not found!` })
      return
    }

    updatedBrand.__v += 1
    await updatedBrand.save()
    res.status(200).send(updatedBrand)
  } catch (error) {
    const { errors } = error as Yup.ValidationError
    res.sendStatus(400).send({ validationErrors: errors })
  }
})

router.delete('/:id', auth, async (req, res) => {
  const brandParamSchema = Yup.object({
    id: Yup.string().required(),
  })

  try {
    const { id } = await brandParamSchema.validate(req.params)
    const brand = await Brand.findByIdAndDelete(id).exec()
    if (!brand) {
      return res.send({ message: `Brand with id ${id} was not found!` })
    }
    res.sendStatus(204)
  } catch (error) {
    const { errors, message } = error as Yup.ValidationError
    res.sendStatus(400).send({ validationErrors: errors, message })
  }
})

export default router
