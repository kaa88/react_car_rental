import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import defaultController from './defaultController.js'
import models from '../models/models.js'
const model = models.user

function getJwt(id, email) {
	return jwt.sign(
		{id, email},
		process.env.SECRET_KEY,
		{expiresIn: '24h'}
	)
}

export default {
	async add(req, res) {
		let existUser = await defaultController.get( req, res, model, ['email', 'login'] )
		if (existUser.length) return res.json('ERR! User already exists')

		let hashPassword = await bcrypt.hash(req.body.password, 5)
		req.body.password = hashPassword
		let response = await defaultController.add( req, res, model )
		return res.json(response)
	},
	async edit(req, res) {
		let response = await defaultController.edit( req, res, model )
		return res.json(response)
	},
	async delete(req, res) {
		let response = await defaultController.delete( req, res, model )
		return res.json(response)
	},
	async get(req, res) {
		let response = await defaultController.get( req, res, model )
		return res.json(response)
	},
	async login(req, res) {
		const {email, password} = req.body
		if (!email || !password) console.log('Enter email and password')

		let user = await model.findOne({where: {email}})
		let comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword) return res.json('Wrong email or password')
		let token = getJwt()
		return res.json(token)
	},
	async check(req, res) {
		let {id, email} = req.user
		return res.json(getJwt(id, email))
	}
}
