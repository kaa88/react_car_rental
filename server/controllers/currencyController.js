import models from '../models/models.js'
const {Currency} = models

export default {
	async add(req, res) {
		let {name, rate} = req.body
		let currency = await Currency.create({name, rate})
		return res.json(currency)
	},

	async delete(req, res) {
		let {name} = req.body
		let currency = await Currency.destroy({where: {name}})
		return res.json(currency)
	},

	async get(req, res) {
		let {name} = req.body
		let currency = await Currency.findOne({where: {name}})
		return res.json(currency)
	}
}