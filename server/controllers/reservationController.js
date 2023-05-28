import models from '../models/models.js'
const {Reservation} = models

// console.log(Reservation.getAttributes());

export default {
	async add(req, res) {
		let {createdAt, updatedAt, id, ...attributes} = Reservation.getAttributes()
		let fields = {}, errors = [];
		Object.keys(attributes).forEach((key) => {
			if (req.body[key] !== '0' && req.body[key])
				fields[key] = req.body[key]
			else errors.push(key)
		})
		if (errors.length > 0) return res.json('ERR! Missing attributes: ' + errors.toString())
		else {
			let response = await Reservation.create(fields)
			return res.json(response)
		}
	},

	async edit(req, res) {
		let {id, ...attributes} = req.body
		if (!id) return res.json('ERR! Missing id')
		else {
			let response = await Reservation.update(
				attributes,
				{where: {id}}
			)
			return res.json(response)
		}
	},

	async delete(req, res) {
		let {id} = req.body
		if (!id) return res.json('ERR! Missing id')
		else {
			let response = await Reservation.destroy({where: {id}})
			return res.json(response)
		}
	},

	async get(req, res) {
		let {userId} = req.body
		if (!userId) return res.json('ERR! Missing userId')
		else {
			let response = await Reservation.findAll({where: {userId}})
			return res.json(response)
		}
	}
}