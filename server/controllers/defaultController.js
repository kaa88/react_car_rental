import ApiError from '../error.js'
import models from '../models/models.js'

export const defaultController = {
	async add(req, res, next, model, returnSimpleResponse) {
		let {createdAt, updatedAt, ...attributes} = model.getAttributes()
		let fields = {}, errors = [];

		Object.values(attributes).forEach((value) => {
			if (value.allowNull === false && !req.body[value.fieldName])
				errors.push(value.fieldName)
			else if (!value.autoIncrement) fields[value.fieldName] = req.body[value.fieldName]
		})

		if (errors.length) return next(ApiError.badRequest(`Error when creating a new entrie. Missing attributes: ${errors.toString()}`))
		try {
			let response = await model.create(fields)
			if (returnSimpleResponse) return response
			else return res.json(response)
		}
		catch(err) {
			return next(ApiError.badRequest(err.message))
		}
	},

	async edit(req, res, next, model, returnSimpleResponse) {
		let {id, ...attributes} = req.body
		if (!id) return next(ApiError.badRequest(`Error when editing an entrie. Missing attributes: id`))
		else {
			let response = await model.update(
				attributes,
				{where: {id}}
			)
			if (returnSimpleResponse) return true
			else return res.json(`Updated ${response[0]} entries`)
		}
	},

	async delete(req, res, next, model) {
		let id = req.body.id
		if (!id) return next(ApiError.badRequest(`Error when deleting an entrie. Missing attributes: id`))

		let response = await model.destroy({where: {id}})
		if (!response) return next(ApiError.badRequest(`Entrie with id=${id} not found`))
		return res.json(`Deleted entrie with id=${id}`)
	},

	async get(req, res, next, model) {
		const filter = req.query
		try {
			let response = await model.findAll({where: filter})
			return res.json(response)
		}
		catch(err) {
			return next(ApiError.badRequest(err.message))
		}
	}
}

export function getDefaultControllers (names = []) {
	let controllers = {}
	if (Array.isArray(names) && names.length) {
		names.forEach((item) => {
			controllers[item] = {
				async add(req, res, next) {
					return await defaultController.add( req, res, next, models[item] )
				},
				async edit(req, res, next) {
					return await defaultController.edit( req, res, next, models[item] )
				},
				async delete(req, res, next) {
					return await defaultController.delete( req, res, next, models[item] )
				},
				async get(req, res, next) {
					return await defaultController.get( req, res, next, models[item] )
				}
			}
		})
	}
	return controllers
}
