import express from 'express'
import CurrencyController from '../controllers/currencyController.js'

const router = express.Router()

router.post('/', CurrencyController.add)
router.delete('/', CurrencyController.delete)
router.get('/', CurrencyController.get)

export default router