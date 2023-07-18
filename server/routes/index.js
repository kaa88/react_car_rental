import express from 'express'
import getDefaultRouters from './defaultRouter.js'
import userRouter from './userRouter.js'

const defaultRouterNames = [
	'cars',
	'carParams',
	'carOptions',
	'reservation',
	'feedback',
	'currency',
]
const defaultRouters = getDefaultRouters(defaultRouterNames)

const mainRouter = express.Router()
defaultRouterNames.forEach((route) =>
	mainRouter.use('/' + route.toLowerCase(), defaultRouters[route])
)
// specific:
mainRouter.use('/user', userRouter)


export default mainRouter