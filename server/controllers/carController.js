import models from '../models/models.js'
const {Car} = models

export default {
	async add(req, res) {
		let {name, eng, tm, pass, bag, door} = req.body
		let car = await Car.create({name, eng, tm, pass, bag, door})
		return res.json(car)
	},

	async delete(req, res) {
		let {name} = req.body
		let car = await Car.destroy({where: {name}})
		return res.json(car)
	},

	async get(req, res) {
		let car, {name} = req.body
		if (name === 'all') car = await Car.findAll()
		else car = await Car.findOne({where: {name}})
		return res.json(car)
	}
}