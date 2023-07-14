import ApiError from '../error.js'
import models from '../models/models.js'

export const defaultController = {
	async add(req, res, next, model) {
		let {createdAt, updatedAt, id, ...attributes} = model.getAttributes()
		let fields = {}, errors = [];

		Object.values(attributes).forEach((value) => {
			if (value.allowNull === false && !req.body[value.fieldName])
				errors.push(value.fieldName)
			else fields[value.fieldName] = req.body[value.fieldName]
		})

		if (errors.length) return next(ApiError.badRequest(`'add' function missing attributes: ${errors.toString()}`))
		else {
			let response = await model.create(fields)
			return response
		}
	},

	async edit(req, res, next, model) {
		let {id, ...attributes} = req.body
		if (!id) return res.json('ERR! Missing id')
		else {
			let response = await model.update(
				attributes,
				{where: {id}}
			)
			return {message: `Updated ${response[0]} entries`}
		}
	},

	async delete(req, res, next, model) {
		let {id} = req.body
		if (!id) return res.json('ERR! Missing id')
		else {
			let response = await model.destroy({where: {id}})
			return {message: `Deleted ${response[0]} entries`}
		}
	},

	async get(req, res, next, model, filter, one) {
		let filterObj = {}, response = null, errors = [];
		if (filter) {
			// filterObj.where = {}
			// if (typeof filter == 'string') filter = [filter]
			// filter.map((item) => {
			// 	if (!req.body[item]) errors.push(item)
			// 	else filterObj.where[item] = req.body[item]
			// })
			filterObj.where = filter
		}
		if (errors.length == filter.length) return next(ApiError.badRequest(`'get' function missing attributes: ${errors.toString()}`))

		try {
			if (one) response = await model.findOne(filterObj)
			else response = await model.findAll(filterObj)
		}
		catch(err) {
			console.error(err.message);
		}
		return response
	}
}

export function getDefaultControllers (names = []) {
	let controllers = {}
	if (Array.isArray(names) && names.length) {
		names.map((item) => {
			controllers[item] = {
				async add(req, res, next) {
					let response = await defaultController.add( req, res, next, models[item] )
					return res.json(response)
				},
				async edit(req, res, next) {
					let response = await defaultController.edit( req, res, next, models[item] )
					return res.json(response)
				},
				async delete(req, res, next) {
					let response = await defaultController.delete( req, res, next, models[item] )
					return res.json(response)
				},
				async get(req, res, next) {
					let {one, ...filter} = req.query
					console.log(filter);
					let response = await defaultController.get( req, res, next, models[item], filter, one )
					return res.json(response)
				}
			}
		})
	}
	return controllers
}
