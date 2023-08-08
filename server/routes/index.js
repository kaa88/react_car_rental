import express from 'express'
import getDefaultRouters from './defaultRouter.js'
import connectionRouter from './connectionRouter.js'
import userRouter from './userRouter.js'
import reservationRouter from './reservationRouter.js'

const defaultRouterNames = [
	'cars',
	'carParams',
	'carOptions',
	'currency',
	'feedback',
]
const defaultRouters = getDefaultRouters(defaultRouterNames)

const mainRouter = express.Router()
defaultRouterNames.forEach((route) =>
	mainRouter.use('/' + route.toLowerCase(), defaultRouters[route])
)
// specific:
mainRouter.use('/connect', connectionRouter)
mainRouter.use('/user', userRouter)
mainRouter.use('/reservation', reservationRouter)


export default mainRouter