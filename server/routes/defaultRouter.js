import express from 'express'
import controllers from '../controllers/index.js'
import tokenMiddleware from '../middleware/tokenMiddleware.js'

function defaultRouter(routeNames = []) {
	let routers = {}
	if (Array.isArray(routeNames) && routeNames.length) {
		routeNames.forEach((item) => {
			let router = express.Router()

			router.get('/', controllers[item].get)
			router.post('/', tokenMiddleware, controllers[item].add)
			router.put('/', tokenMiddleware, controllers[item].edit)
			router.delete('/', tokenMiddleware, controllers[item].delete)

			routers[item] = router
		})
	}
	return routers
}

export default defaultRouter