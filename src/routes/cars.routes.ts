import { Router } from 'express'
import * as Yup from 'yup'

import { Car } from '../models/Car'
import { auth } from '../middlewares/auth'
import { upload } from '../middlewares/upload'
import validationRoute from '../middlewares/validateRoute'
import * as carSchema from '../schemas/car.schema'
import { IBrand } from '../entities/IBrand'

const router = Router()

router.get('/', async (req, res) => {
  const carQuerySchema = Yup.object({
    field: Yup.string().default('year'),
    direction: Yup.string().default('asc'),
  })
  try {
    const { field } = await carQuerySchema.validate(req.query)
    const cars = await Car.find()
      .populate('brand')
      .sort([[field, 'asc']])
      .exec()
    res.send(cars)
  } catch (error) {
    const { errors, message } = error as Yup.ValidationError
    res.status(400).send({ validationErrors: errors, message })
  }
})

router.get('/:id', async (req, res) => {
  const carParamSchema = Yup.object({
    id: Yup.string().required(),
  })

  try {
    const { id } = await carParamSchema.validate(req.params)
    const car = await Car.findById(id).populate('brand').exec()
    if (!car) {
      res.status(204).send({ message: `Car with id ${id} was not found!` })
    }
    res.sendStatus(200).send(car)
  } catch (error) {
    const { errors, message } = error as Yup.ValidationError
    res.sendStatus(400).send({ validationErrors: errors, message })
  }
})

router.get('/brand/:brandId', async (req, res) => {
  const carParamSchema = Yup.object({
    brandId: Yup.string().required(),
  })

  try {
    const { brandId } = await carParamSchema.validate(req.params)
    const cars = await Car.find({
      brand: brandId,
    })
      .populate('brand')
      .exec()

    res.sendStatus(200).send(cars)
  } catch (error) {
    const { errors, message } = error as Yup.ValidationError
    res.sendStatus(400).send({ validationErrors: errors, message })
  }
})

router.post(
  '/',
  validationRoute(carSchema.CreateCar.schema),
  auth,
  async (req, res) => {
    try {
      const newCar = await new Car(req.body).save()
      const carWithBrand = await newCar.populate<{ brand: IBrand }>('brand')
      res.status(201).send({ car: carWithBrand })
    } catch (error) {
      res.status(500).send('Internal Server Error')
    }
  }
)

router.patch(
  '/uploadImage/:id',
  auth,
  upload.single('carImage'),
  async (req, res) => {
    const carParamSchema = Yup.object({
      id: Yup.string().required(),
    })
    const { file } = req

    try {
      const { id } = await carParamSchema.validate(req.params)
      const carToUpdate = await Car.findByIdAndUpdate(id, {
        image: file?.filename,
      }).exec()
      if (!carToUpdate) {
        res.status(204).send({ message: `Car with id ${id} was not found!` })
      }
      const updatedCar = await Car.findById(id).populate('brand').exec()
      if (!updatedCar) {
        res.status(204).send({ message: `Car with id ${id} was not found!` })
        return
      }

      updatedCar.__v += 1
      await updatedCar.save()
      res.status(200).send(updatedCar)
    } catch (error) {
      const { errors } = error as Yup.ValidationError
      res.status(400).send({ validationErrors: errors })
    }
  }
)

router.put(
  '/:id',
  validationRoute(carSchema.UpdateCar.schema),
  auth,
  async (req, res) => {
    try {
      const car = req.body
      const { id } = req.params
      const carToUpdate = await Car.findByIdAndUpdate(id, car).exec()
      if (!carToUpdate) {
        res.status(204).send({ message: `Car with id ${id} was not found!` })
      }
      const updatedCar = await Car.findById(id).exec()
      if (!updatedCar) {
        res.status(204).send({ message: `Car with id ${id} was not found!` })
        return
      }

      updatedCar.__v += 1
      await updatedCar.save()
      res.status(200).send(updatedCar)
    } catch (error: any) {
      res.status(500).send(`Internal Server Error: ${error}`)
    }
  }
)

router.delete(
  '/:id',
  validationRoute(carSchema.DeleteCar.schema),
  auth,
  async (req, res) => {
    try {
      const { id } = req.params
      const car = await Car.findByIdAndDelete(id).exec()
      if (!car) {
        res.status(400).send({ message: `Car with id ${id} was not found!` })
      }
      res.status(204).send()
    } catch (error: any) {
      res.status(500).send(`Internal Server Error: ${error}`)
    }
  }
)

export default router
