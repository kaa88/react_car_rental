import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ApiError from '../error.js'
import {defaultController} from './defaultController.js'
import {user} from '../models/models.js'
import {validationResult} from 'express-validator'


function getAccessJwt(id, email) {
	return jwt.sign(
		{id, email},
		process.env.JWT_ACCESS_SECRET_KEY,
		{expiresIn: '15m'}
	)
}
function getRefreshJwt(id, email) {
	return jwt.sign(
		{id, email},
		process.env.JWT_REFRESH_SECRET_KEY,
		{expiresIn: '15d'}
	)
}

// async function findUser(email) {
// 	let candidate = await user.findOne({where: {email}})
// }

export default {
	async add(req, res, next) {
		let errors = validationResult(req)
		if (!errors.isEmpty()) return next(ApiError.badRequest('Validation failed', errors))

		const {email, password} = req.body

		let existUser = await user.findOne({where: {email}})
		if (existUser) return next(ApiError.badRequest(`User with email '${email}' already exists`))

		let hashPassword = await bcrypt.hash(password, 5)
		req.body.password = hashPassword

		return await defaultController.add( req, res, next, user )
	},

	async edit(req, res, next) {
		return await defaultController.edit( req, res, next, user )
	},

	async delete(req, res, next) {
		return await defaultController.delete( req, res, next, user )
	},

	async activate(req, res, next) {
	},

	async login(req, res, next) {
		console.log(req.body);
		let {email, password} = req.body
		if (!email || !password) return next(ApiError.badRequest('Email and password are required'))

		let candidate;
		try {
			candidate = await user.findOne({where: {email}})
			let comparePassword = bcrypt.compareSync(password, candidate.password)
			if (!comparePassword) throw('err')
		} catch(err) {
			return next(ApiError.unauthorized('Wrong email or password'))
		}

		let accessToken = getAccessJwt(candidate.id, email)
		let refreshToken = getRefreshJwt(candidate.id, email)
		let updateResponse = await candidate.update(
			{accessToken, refreshToken}
		)
		let userData = {
			id: updateResponse.id,
			email: updateResponse.email,
			role: updateResponse.role,
			accessToken: updateResponse.accessToken,
			image: updateResponse.image,
			language: updateResponse.language,
			currency: updateResponse.currency,
		}
		res.cookie('refreshToken', refreshToken, {
			maxAge: 15*24*60*60*1000,
			httpOnly: true,
			// secure: true,
		})
		return res.json(userData)
	},

	async logout(req, res, next) {
		let {id} = req.body
		if (!id) return next(ApiError.badRequest('Missing id'))
		try {
			let response = await user.update(
				{accessToken: null, refreshToken: null},
				{where: {id}}
			)
			if (response) {
				res.clearCookie('refreshToken')
				return res.json({ok: true})
			}
		}
		catch(err) {
			return next(ApiError.badRequest('Error when log out'))
		}
	},

	async updatetoken(req, res, next) {
	},

	async check(req, res, next) {
		let user;
		try {
			let token = req.headers.authorization
			user = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY)
		} catch(err) {
			return next(ApiError.unauthorized('Wrong or missing token'))
		}
		return res.json(getJwt(user.id, user.email))
	}

}
