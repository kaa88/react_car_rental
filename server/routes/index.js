import express from 'express'
import getDefaultRouters from './defaultRouter.js'
import languageRouter from './langRouter.js'
import userRouter from './userRouter.js'

const defaults = [
	'car',
	'carprops',
	'currency',
	'feedback',
	'regexp',
	'reservation'
]
const defaultRouters = getDefaultRouters(defaults)
const mainRouter = express.Router()
defaults.forEach((route) =>
	mainRouter.use('/' + route, defaultRouters[route])
)
// specific:
mainRouter.use('/language', languageRouter)
mainRouter.use('/user', userRouter)

export default mainRouter