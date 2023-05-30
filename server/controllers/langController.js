import ApiError from '../error.js'
import {defaultController} from './defaultController.js'
import lang from '../models/languages.js'


export default {
	async add(req, res, next) {
	},

	async edit(req, res, next) {
	},

	async delete(req, res, next) {
	},

	async get(req, res, next) {
		let {text, currentLang, translateTo} = req.body

		console.log(req.body);
		console.log(lang[currentLang]);

		let string = await lang[currentLang].findOne({where: {text}})
		let id = string.id
		let translate = await lang[translateTo].findOne({where: {id}})
		return res.json(translate.text)
	}
}
