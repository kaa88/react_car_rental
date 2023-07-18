import ApiError from '../error.js'
import models from '../models/models.js'

export const defaultController = {
	async add(req, res, next, model) {
		let {createdAt, updatedAt, id, ...attributes} = model.getAttributes()
		// console.log(Object.keys(attributes));

		let fields = {}, errors = [];

		Object.values(attributes).forEach((value) => {
			if (value.allowNull === false && !req.body[value.fieldName])
				errors.push(value.fieldName)
			else fields[value.fieldName] = req.body[value.fieldName]
		})

		if (errors.length) return next(ApiError.badRequest(`Error when creating a new entrie. Missing attributes: ${errors.toString()}`))
		else {
			let response = await model.create(fields)
			return response
		}
	},

	async edit(req, res, next, model) {
		let {id, ...attributes} = req.body
		if (!id) return next(ApiError.badRequest(`Error when editing an entrie. Missing attributes: id`))
		else {
			let response = await model.update(
				attributes,
				{where: {id}}
			)
			return {message: `Updated ${response[0]} entries`}
		}
	},

	async delete(req, res, next, model) {
		let id = req.query.id
		if (!id) return next(ApiError.badRequest(`Error when deleting an entrie. Missing attributes: id`))

		let response = await model.destroy({where: {id}})
		if (!response) return next(ApiError.badRequest(`Entrie with id=${id} not found`))
		return {message: `Deleted ${response} entrie`}
	},

	async get(req, res, next, model) {
		const filter = req.query
		try {
			let response = await model.findAll({where: filter})
			return response
		}
		catch(err) {
			console.error(err.message)
		}
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
					let response = await defaultController.get( req, res, next, models[item] )
					return res.json(response)
				}
			}
		})
	}
	return controllers
}
