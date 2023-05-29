import models from '../models/models.js'

const defaultController = {
	async add(req, res, model) {
		let {createdAt, updatedAt, id, ...attributes} = model.getAttributes()
		let fields = {}, errors = [];

		Object.values(attributes).forEach((value) => {
			if (value.allowNull === false && !req.body[value.fieldName])
				errors.push(value.fieldName)
			else fields[value.fieldName] = req.body[value.fieldName]
		})

		if (errors.length) return res.json('ERR! "add" function missing attributes: ' + errors.toString())
		else {
			let response = await model.create(fields)
			return response
		}
	},

	async edit(req, res, model) {
		let {id, ...attributes} = req.body
		if (!id) return res.json('ERR! Missing id')
		else {
			let response = await model.update(
				attributes,
				{where: {id}}
			)
			return {message: 'Updated ' + response[0] + ' entries'}
		}
	},

	async delete(req, res, model) {
		let {id} = req.body
		if (!id) return res.json('ERR! Missing id')
		else {
			let response = await model.destroy({where: {id}})
			return {message: 'Deleted ' + response[0] + ' entries'}
		}
	},

	async get(req, res, model, filter, count) {
		let filterObj = {}, response = null, errors = [];
		if (filter) {
			filterObj.where = {}
			if (typeof filter == 'string') filter = [filter]
			filter.map((item) => {
				if (!req.body[item]) errors.push(item)
				else filterObj.where[item] = req.body[item]
			})
		}
		if (errors.length == filter.length) return res.json('ERR! "get" function missing attributes: ' + errors.toString())

		if (count === 'one') response = await model.findOne(filterObj)
		else response = await model.findAll(filterObj)
		return response
	}
}

export default function(names = []) {
	let controllers = {}
	if (Array.isArray(names) && names.length > 0) {
		names.map((item) => {
			controllers[item] = {
				async add(req, res) {
					let response = await defaultController.add( req, res, models[item] )
					return res.json(response)
				},
				async edit(req, res) {
					let response = await defaultController.edit( req, res, models[item] )
					return res.json(response)
				},
				async delete(req, res) {
					let response = await defaultController.delete( req, res, models[item] )
					return res.json(response)
				},
				async get(req, res) {
					let response = await defaultController.get( req, res, models[item] )
					return res.json(response)
				}
			}
		})
	}
	return controllers
}
