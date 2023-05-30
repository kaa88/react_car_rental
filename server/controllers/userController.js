import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ApiError from '../error.js'
import {defaultController} from './defaultController.js'
import regexp from '../regexp.js'
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
	async add(req, res, next) {
		let {email, password} = req.body
		if (!email || !password) return next(ApiError.badRequest('Email and password are required'))

		let existUser = await model.findOne({where: {email}})
		if (existUser) return next(ApiError.badRequest(`User with email '${email}' already exists`))

		let emailIsOk = regexp.email.test(email)
		if (!emailIsOk) return next(ApiError.badRequest('Incorrect email'))

		let passwordIsOk = regexp.password.test(password)
		if (!passwordIsOk) return next(ApiError.badRequest('Incorrect password'))

		let hashPassword = await bcrypt.hash(password, 5)
		req.body.password = hashPassword

		let response = await defaultController.add( req, res, next, model )
		return res.json(response)
	},

	async edit(req, res, next) {
		// check role
		let response = await defaultController.edit( req, res, next, model )
		return res.json(response)
	},

	async delete(req, res, next) {
		// check role
		let response = await defaultController.delete( req, res, next, model )
		return res.json(response)
	},

	async get(req, res, next) {
		let response = await defaultController.get( req, res, next, model )
		return res.json(response)
	},

	async login(req, res, next) {
		let {email, password} = req.body
		if (!email || !password) return next(ApiError.badRequest('Email and password are required'))

		let user;
		try {
			user = await model.findOne({where: {email}})
			let comparePassword = bcrypt.compareSync(password, user.password)
			if (!comparePassword) throw('err')
		} catch(err) {
			return next(ApiError.unauthorized('Wrong email or password'))
		}

		let token = getJwt(user.id, email)
		return res.json(token)
	},

	async check(req, res, next) {
		let user;
		try {
			let token = req.headers.authorization
			user = jwt.verify(token, process.env.SECRET_KEY)
		} catch(err) {
			return next(ApiError.unauthorized('Wrong or missing token'))
		}
		return res.json(getJwt(user.id, user.email))
	}
}
