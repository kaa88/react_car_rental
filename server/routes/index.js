import express from 'express'
import getDefaultRouters from './defaultRouter.js'
import userRouter from './userRouter.js'

const defaults = [
	'car',
	'carprops',
	'currency',
	'feedback',
	'language',
	'regexp',
	'reservation'
]
const defaultRouters = getDefaultRouters(defaults)
const mainRouter = express.Router()
defaults.forEach((route) =>
	mainRouter.use('/' + route, defaultRouters[route])
)
// specific:
mainRouter.use('/user', userRouter)

export default mainRouter