import ApiError from '../error.js'
import {defaultController} from './defaultController.js'
import {feedback} from '../models/models.js'


export default {

	async get(req, res, next) {
		let {max, order, ...filter} = req.query
		let params = {}
		if (filter) params.where = filter
		if (max) params.limit = Number(max)
		if (order) params.order = [['id', order.toUpperCase()]]
		
		try {
			let response = await feedback.findAll(params)
			return res.json(response)
		}
		catch(err) {
			return next(ApiError.badRequest(err.message))
		}
	},

	// default:
	async add(req, res, next) {
		let response = await defaultController.add( req, res, next, feedback )
		return res.json(response)
	},
	async edit(req, res, next) {
		let response = await defaultController.edit( req, res, next, feedback )
		return res.json(response)
	},
	async delete(req, res, next) {
		let response = await defaultController.delete( req, res, next, feedback )
		return res.json(response)
	},
}
