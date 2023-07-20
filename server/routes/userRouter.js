import express from 'express'
import userController from '../controllers/userController.js'
import {body} from 'express-validator'
import tokenMiddleware from '../middleware/tokenMiddleware.js'

const router = express.Router()

router.post(
	'/add',
	body('email').isEmail(),
	body('password').isLength({min: 3}), // temp
	// body('password').isStrongPassword({
	// 	minLength: 8,
	// 	minLowercase: 1,
	// 	minUppercase: 1,
	// 	minNumbers: 1,
	// 	minSymbols: 1,
	// }),
	userController.add
)
router.put('/edit', userController.edit)
router.delete('/delete', userController.delete)
router.post('/activate/:code', userController.activate)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/updatetoken', tokenMiddleware, userController.updatetoken)
router.get('/check', tokenMiddleware, userController.check) //?

export default router