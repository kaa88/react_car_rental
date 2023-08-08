import bcrypt from 'bcrypt'
import ApiError from '../error.js'
import {defaultController} from './defaultController.js'
import {user} from '../models/models.js'
import {validationResult} from 'express-validator'
import TokenService from '../services/TokenService.js'
import FileService from '../services/FileService.js'

const TOKEN_ERROR = ApiError.internal('Token middleware malfunction')


const userController = {
	async getUserData(req, res, next) {
		if (!req.tokenData?.id) return next(TOKEN_ERROR)
		let candidate = await user.findOne({where: {id: req.tokenData.id}})
		if (!candidate) return next(ApiError.badRequest('User not found'))
		let userData = new UserDTO(candidate.dataValues)
		return res.json({userData})
	},

	async add(req, res, next) {
		let errors = validationResult(req)
		if (!errors.isEmpty()) return next(ApiError.badRequest('Validation failed', errors))

		const {email, password} = req.body

		let existUser = await user.findOne({where: {email}})
		if (existUser) return next(ApiError.badRequest(`User with email '${email}' already exists`))

		let hashPassword = await bcrypt.hash(password, 5)
		req.body.password = hashPassword
		req.body.role = 'USER'
		req.body.isActivated = false

		let newUser = await defaultController.add( req, res, next, user, true )
		let userData = new UserDTO(newUser)
		let {accessToken, refreshToken} = TokenService.generateToken({id: newUser.id, email, role: req.body.role})
		res.cookie(...getCookieSettings(refreshToken))
		return res.json({userData, accessToken})
	},

	async edit(req, res, next) {
		if (!req.tokenData?.id) return next(TOKEN_ERROR)
		const {id} = req.tokenData
		req.body = new EditableFields(req.body)
		req.body.id = id
		let response = await defaultController.edit( req, res, next, user, true )
		if (response === true) return await userController.getUserData(req, res, next)
	},

	async delete(req, res, next) {
		if (!req.tokenData?.id) return next(TOKEN_ERROR)
		req.query.id = req.tokenData.id
		return await defaultController.delete( req, res, next, user )
	},

	async activate(req, res, next) {
		return next(ApiError.internal('Activation function is under construction'))
	},

	async login(req, res, next) {
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
		let {accessToken, refreshToken} = TokenService.generateToken({id: candidate.dataValues.id, email, role: candidate.dataValues.role})
		res.cookie(...getCookieSettings(refreshToken))
		return res.json({userData, accessToken})
	},

	async logout(req, res, next) {
		res.clearCookie('refreshToken')
		return res.json({ok: true})
	},

	async refresh(req, res, next) {
		try {
			let token = req.cookies.refreshToken
			if (!token) throw 'er'
	
			let tokenData = TokenService.validateRefreshToken(token)
			if (tokenData instanceof Error) throw 'er'
	
			let {id, email, role} = tokenData
			let candidate = await user.findOne({where: {id, email}})
			if (!candidate) return next(ApiError.badRequest('User not found'))
	
			let {accessToken, refreshToken} = TokenService.generateToken({id, email, role})
	
			res.cookie(...getCookieSettings(refreshToken))
			res.send(accessToken)
		}
		catch(er) {
			return next(ApiError.unauthorized())
		}
	},

	async changePassword(req, res, next) {
		if (!req.tokenData?.id) return next(TOKEN_ERROR)
		let errors = validationResult(req)
		if (!errors.isEmpty()) return next(ApiError.badRequest('Password is too weak', errors))

		req.body.id = req.tokenData.id
		let {id, currentPassword, newPassword} = req.body
		if (!id || !currentPassword || !newPassword) return next(ApiError.badRequest('Missing arguments'))

		let candidate = await user.findOne({where: {id}})
		if (!candidate) return next(ApiError.badRequest('User not found'))
		let comparePassword = bcrypt.compareSync(currentPassword, candidate.password)
		if (!comparePassword) return next(ApiError.badRequest('Current password is invalid'))

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
		if (!req.tokenData?.id) return next(TOKEN_ERROR)
		const {id} = req.tokenData

		if (!req.files?.file) return next(ApiError.badRequest('No file uploaded'))
		let {file} = req.files
		let fileName = FileService.uploadUserPhoto(file)
		if (fileName instanceof Error) return next(ApiError.internal('File upload error'))
		req.body.image = fileName

		let userData = await user.findOne({where: {id}})
		let prevImage = userData ? userData.dataValues.image : ''

		req.body = new EditableFields(req.body)
		req.body.id = id
		let response = await defaultController.edit( req, res, next, user, true )
		if (response) {
			if (prevImage) FileService.deleteUserPhoto(prevImage)
			res.json({ok: true})
		}
	}
}
export default userController


function getCookieSettings(token = 'null') {
	return [
		'refreshToken',
		token,
		{
			maxAge: 15*24*60*60*1000, // 15d
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

class EditableFields {
	constructor(body) {
		if (body.name) this.name = body.name
		if (body.image) this.image = body.image
		if (body.language) this.language = body.language
		if (body.currency) this.currency = body.currency
		if (body.cookieAccepted) this.cookieAccepted = body.cookieAccepted
	}
}
