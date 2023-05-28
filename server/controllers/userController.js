import models from '../models/models.js'
const {User} = models

export default {
	async register(req, res) {
		let {email, login, password, role} = req.body
		let user = await User.create({
			email,
			login,
			password,
			role,
		})
		return res.json(user)
	},

	async login(req, res) {
		res.send('Login')
	},

	async check(req, res) {
		let {id} = req.query
		if (!id) return res.json('Error. No id')
		let user = await User.findOne({where: {id}})
		return res.json(user)
	}
}
