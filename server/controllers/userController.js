import bcrypt from 'bcrypt'
import ApiError from '../error.js'
import {defaultController} from './defaultController.js'
import {user} from '../models/models.js'
import {validationResult} from 'express-validator'
import TokenService from '../services/TokenService.js'
import UploadService from '../services/UploadService.js'

const userController = {
	async add(req, res, next) {
		let errors = validationResult(req)
		if (!errors.isEmpty()) return next(ApiError.badRequest('Validation failed', errors))

		const {email, password} = req.body

		let existUser = await user.findOne({where: {email}})
		if (existUser) return next(ApiError.badRequest(`User with email '${email}' already exists`))

		let hashPassword = await bcrypt.hash(password, 5)
		req.body.password = hashPassword
		req.body.role = 'USER'

		let newUser = await defaultController.add( req, res, next, user, true )
		let userData = new UserDTO(newUser)
		let {accessToken, refreshToken} = TokenService.generateToken({id: newUser.id, email})
		res.cookie(...getCookieSettings(refreshToken))
		return res.json({userData, accessToken})
	},

	async edit(req, res, next) {
		const id = req.tokenData ? req.tokenData.id : null
		req.body.id = id
		// Disallow edit following fields
		delete req.body.email
		delete req.body.password
		delete req.body.role
		delete req.body.isActivated
		let response = await defaultController.edit( req, res, next, user, true )
		if (response) {
			let candidate = await user.findOne({where: {id}})
			if (!candidate) return next(ApiError.badRequest('User not found'))
			let userData = new UserDTO(candidate.dataValues)
			return res.json({userData})
		}
	},

	async delete(req, res, next) {
		req.body.id = req.tokenData ? req.tokenData.id : null
		return await defaultController.delete( req, res, next, user )
	},

	async activate(req, res, next) {
		return next(ApiError.internal('Activation function is under construction'))
	},

	async login(req, res, next) {
		console.log(req.body);
		let {email, password} = req.body
		if (!email || !password) return next(ApiError.badRequest('Email and password are required'))

		let candidate;
		try {
			candidate = await user.findOne({where: {email}})
			if (!candidate) throw 'er'
			let comparePassword = bcrypt.compareSync(password, candidate.password)
			if (!comparePassword) throw 'er'
		} catch(er) {
			return next(ApiError.badRequest('Wrong email or password'))
		}
		let userData = new UserDTO(candidate.dataValues)
		let {accessToken, refreshToken} = TokenService.generateToken({id: candidate.dataValues.id, email})
		res.cookie(...getCookieSettings(refreshToken))
		return res.json({userData, accessToken})
	},

	async logout(req, res, next) {
		res.clearCookie('refreshToken')
		return res.json({ok: true})
	},

	async getUserData(req, res, next) {
		let {id} = req.tokenData
		let candidate = await user.findOne({where: {id}})
		if (!candidate) return next(ApiError.badRequest('User not found'))
		let userData = new UserDTO(candidate.dataValues)
		return res.json({userData})
	},

	async refresh(req, res, next) {
		console.log('REFRESH');
		try {
			let token = req.cookies.refreshToken
			if (!token) throw 'er'
	
			let tokenData = TokenService.validateRefreshToken(token)
			if (tokenData instanceof Error) throw 'er'
	
			let {id, email} = tokenData
			let candidate = await user.findOne({where: {id, email}})
			if (!candidate) return next(ApiError.badRequest('User not found'))
	
			let {accessToken, refreshToken} = TokenService.generateToken({id, email})
	
			res.cookie(...getCookieSettings(refreshToken))
			res.send(accessToken)
		}
		catch(er) {
			return next(ApiError.unauthorized())
		}
	},

	async changePassword(req, res, next) {
		let errors = validationResult(req)
		if (!errors.isEmpty()) return next(ApiError.badRequest('Password is too weak', errors))

		req.body.id = req.tokenData ? req.tokenData.id : null
		let {id, currentPassword, newPassword} = req.body
		if (!id || !currentPassword || !newPassword) return next(ApiError.badRequest('Missing arguments'))

		try {
			let candidate = await user.findOne({where: {id}})
			let comparePassword = bcrypt.compareSync(currentPassword, candidate.password)
			if (!comparePassword) throw 'er'
		} catch(er) {
			return next(ApiError.badRequest('Current password is invalid'))
		}
		let hashPassword = await bcrypt.hash(newPassword, 5)
		req.body.password = hashPassword
		return await defaultController.edit( req, res, next, user )
	},

	async restorePassword(req, res, next) {
		let {email} = req.body
		if (!email) return next(ApiError.badRequest('Missing email'))
		try {
			let candidate = await user.findOne({where: {email}})
			if (!candidate) throw 'er'
			// send email
			res.json({ok: true})
		} catch(er) {
			return next(ApiError.badRequest('User not found'))
		}
	},

	async addPhoto(req, res, next) {
		// не видит формдату, нужен парсер (express-fileupload || express-form-data) - изучить, поставить, настроить!
		
		console.log(req.body);
		let formData = req.body.formData
		let fi = formData.get('file')
		console.log(fi);
		const id = req.tokenData ? req.tokenData.id : null
		req.body.id = id

		let file = ''
		UploadService.uploadUserPhoto(file)

		let response = await defaultController.edit( req, res, next, user, true )

		res.send('tipo ok')
	}
}

function getCookieSettings(token = 'null') {
	return [
		'refreshToken',
		token,
		{
			maxAge: 15*24*60*60*1000,
			httpOnly: true,
			// secure: true,
		}
	]
}

class UserDTO {
	constructor(user) {
		this.id = user.id
		this.email = user.email
		this.role = user.role
		this.name = user.name
		this.image = user.image
		this.isActivated = user.isActivated
		this.cookieAccepted = user.cookieAccepted
		this.language = user.language
		this.currency = user.currency
	}
}

export default userController