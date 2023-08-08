import express from 'express'
import connectionController from '../controllers/connectionController.js'
import tokenMiddleware from '../middleware/tokenMiddleware.js'

const router = express.Router()

router.get('/', tokenMiddleware, connectionController.connect)

export default router
