import express from 'express'
import controllers from '../controllers/index.js'

export default function(routeNames = []) {
	let routers = {}
	if (Array.isArray(routeNames) && routeNames.length > 0) {
		routeNames.map((item) => {
			let router = express.Router()

			router.post('/', controllers[item].add)
			router.put('/', controllers[item].edit)
			router.delete('/', controllers[item].delete)
			router.get('/', controllers[item].get)

			routers[item] = router
		})
	}
	return routers
}