import models from '../models/models.js'
const {Language} = models

export default {
	async add(req, res) {
		let {locale} = req.body
		let lang = await Language.create({locale})
		return res.json(lang)
	},

	async delete(req, res) {
		let {locale} = req.body
		let lang = await Language.destroy({where: {locale}})
		return res.json(lang)
	},

	async get(req, res) {
		let {locale} = req.body
		let lang = await Language.findOne({where: {locale}})
		return res.json(lang)
	}

}
