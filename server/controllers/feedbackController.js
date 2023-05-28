import models from '../models/models.js'
const {Feedback} = models

export default {
	async add(req, res) {
		let {img, rating, text, author} = req.body
		let errors = []
		if (!text) errors.push('text')
		if (!author) errors.push('author')
		if (errors.length > 0) return res.json('ERR! Missing attributes: ' + errors.toString())
		else {
			let response = await Feedback.create({img, rating, text, author})
			return res.json(response)
		}
	},

	async edit(req, res) {
		let {id, ...attributes} = req.body
		if (!id) return res.json('ERR! Missing id')
		else {
			let response = await Feedback.update(
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
			let response = await Feedback.destroy({where: {id}})
			return res.json(response)
		}
	},

	async get(req, res) {
		let response = await Feedback.findAll() // проверить
		return res.json(response)
	}
}