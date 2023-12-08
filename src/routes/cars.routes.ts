import { Router } from 'express'
import * as Yup from 'yup'
import { Car } from '../models/Car'
import { auth } from '../middlewares/auth'

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
    res.sendStatus(400).send({ validationErrors: errors, message })
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
      res.sendStatus(204).send({ message: `Car with id ${id} was not found!` })
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

router.post('/', auth, async (req, res) => {
  const carSchema = Yup.object({
    model: Yup.string().required(),
    year: Yup.number().positive(),
    color: Yup.string(),
    fuel: Yup.string(),
    brand: Yup.string().required(),
  })

  try {
    const car = await carSchema.validate(req.body)
    const newCar = await new Car(car).save()
    const carWithBrand = await newCar.populate('brand')
    res.status(201).send({ car: carWithBrand })
  } catch (error) {
    const { errors } = error as Yup.ValidationError
    res.sendStatus(400).send({ validationErrors: errors })
  }
})

router.put('/:id', async (req, res) => {
  const carParamSchema = Yup.object({
    id: Yup.string().required(),
  })
  const carSchema = Yup.object({
    model: Yup.string().required(),
    year: Yup.number().positive(),
    color: Yup.string(),
    fuel: Yup.string(),
    brand: Yup.string().required(),
  })

  try {
    const car = await carSchema.validate(req.body)
    const { id } = await carParamSchema.validate(req.params)
    const carToUpdate = await Car.findByIdAndUpdate(id, car).exec()
    if (!carToUpdate) {
      res.sendStatus(204).send({ message: `Car with id ${id} was not found!` })
    }
    const updatedCar = await Car.findById(id).exec()
    if (!updatedCar) {
      res.sendStatus(204).send({ message: `Car with id ${id} was not found!` })
      return
    }

    updatedCar.__v += 1
    await updatedCar.save()
    res.sendStatus(200).send(updatedCar)
  } catch (error) {
    const { errors } = error as Yup.ValidationError
    res.sendStatus(400).send({ validationErrors: errors })
  }
})

router.delete('/:id', async (req, res) => {
  const carParamSchema = Yup.object({
    id: Yup.string().required(),
  })

  try {
    const { id } = await carParamSchema.validate(req.params)
    const car = await Car.findByIdAndDelete(id).exec()
    if (!car) {
      res.sendStatus(400).send({ message: `Car with id ${id} was not found!` })
    }
    res.sendStatus(204).send()
  } catch (error) {
    const { errors, message } = error as Yup.ValidationError
    res.sendStatus(400).send({ validationErrors: errors, message })
  }
})

export default router
