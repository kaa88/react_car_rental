import express from 'express'
import reservationController from '../controllers/reservationController.js'
import tokenMiddleware from '../middleware/tokenMiddleware.js'

const router = express.Router()

router.post('/', tokenMiddleware, reservationController.add)
router.put('/', tokenMiddleware, reservationController.edit)
router.delete('/', tokenMiddleware, reservationController.delete)
router.get('/', tokenMiddleware, reservationController.get)

export default router
