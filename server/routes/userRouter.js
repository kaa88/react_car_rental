import express from 'express'
import userController from '../controllers/userController.js'
import {body} from 'express-validator'
import tokenMiddleware from '../middleware/tokenMiddleware.js'

const router = express.Router()

router.post(
	'/add',
	body('email').isEmail(),
	body('password').isLength({min: 4}), // temp
	// body('password').isStrongPassword(passwordValidationSettings),
	userController.add
)
router.delete('/delete', tokenMiddleware, userController.delete)
router.put('/edit', tokenMiddleware, userController.edit)
router.put(
	'/changepassword',
	tokenMiddleware,
	body('newPassword').isLength({min: 8}), // temp
	// body('newPassword').isStrongPassword(passwordValidationSettings),
	userController.changePassword
)
router.post('/activate/:code', userController.activate)
router.post('/restorepassword', userController.restorePassword)
router.post('/login', userController.login)
router.post('/logout', tokenMiddleware, userController.logout)
router.post('/uploadimage', tokenMiddleware, userController.addPhoto)
router.get('/refresh', userController.refresh)
router.get('/', tokenMiddleware, userController.getUserData)

export default router

const passwordValidationSettings = {
	minLength: 8,
	minLowercase: 1,
	minUppercase: 1,
	minNumbers: 1,
	minSymbols: 1,
}