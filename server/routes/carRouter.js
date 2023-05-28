import express from 'express'
import CarController from '../controllers/carController.js'

const router = express.Router()

router.post('/', CarController.add)
router.delete('/', CarController.delete)
router.get('/', CarController.get)

export default router