import express from 'express'
import langRouter from './langRouter.js'
import currencyRouter from './currencyRouter.js'
import feedbackRouter from './feedbackRouter.js'
import carRouter from './carRouter.js'
import reservationRouter from './reservationRouter.js'
import userRouter from './userRouter.js'

const router = express.Router()

router.use('/lang', langRouter)
router.use('/currency', currencyRouter)
router.use('/feedback', feedbackRouter)
router.use('/car', carRouter)
router.use('/reservation', reservationRouter)
router.use('/user', userRouter)

export default router