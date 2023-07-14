import express from 'express'
import userController from '../controllers/userController.js'

const router = express.Router()

router.post('/add', userController.add)
router.put('/edit', userController.edit)
router.delete('/delete', userController.delete)
router.post('/activate/:code', userController.activate)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/updatetoken', userController.updatetoken)
router.get('/check', userController.check) //?

export default router