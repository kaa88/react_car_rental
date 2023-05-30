import express from 'express'
import userController from '../controllers/userController.js'

const router = express.Router()

router.post('/add', userController.add)
router.post('/edit', userController.edit)
router.delete('/delete', userController.delete)
router.post('/login', userController.login)
router.get('/check', userController.check)

export default router