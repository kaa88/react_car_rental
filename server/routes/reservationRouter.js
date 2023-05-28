import express from 'express'
import ReservationController from '../controllers/reservationController.js'

const router = express.Router()

router.post('/add', ReservationController.add)
router.post('/edit', ReservationController.edit)
router.delete('/delete', ReservationController.delete)
router.get('/', ReservationController.get)

export default router