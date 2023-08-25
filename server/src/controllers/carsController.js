import ApiError from '../error.js'
import {defaultController} from './defaultController.js'
import {cars} from '../models/models.js'
import UserService from '../services/UserService.js'

const REQUIRED_ROLE = 'ADMIN'
const ADMIN_ROLE = 'ADMIN'


const carsController = {
	async get(req, res, next) {
		let carList = await defaultController.get( req, res, next, cars, true )
		let data = carList.map((item) => new DTO(item.dataValues))
		return res.json(data)
	},
	async add(req, res, next) {
		let {ok, error} = prepare(req, res, next)
		if (!ok) return error
		return await defaultController.add( req, res, next, models[item] )
	},
	async edit(req, res, next) {
		let {ok, error} = prepare(req, res, next)
		if (!ok) return error
		return await defaultController.edit( req, res, next, models[item] )
	},
	async delete(req, res, next) {
		let {ok, error} = prepare(req, res, next)
		if (!ok) return error
		return await defaultController.delete( req, res, next, models[item] )
	}
}
export default carsController


function prepare(req, res, next, action) {
	if (!req.tokenData?.id) return {error: next(ApiError.internal('Token middleware malfunction'))}

	let userRoleIsOk = UserService.checkRole(REQUIRED_ROLE, req.tokenData.role)
	if (!userRoleIsOk) return {error: next(ApiError.forbidden(`Only users with role '${REQUIRED_ROLE}' or above can ${action} reservations`))}

	return {ok: true}
}


class DTO {
	constructor(data) {
		this.id = data.id
		this.name = data.name
		this.shortName = data.shortName
		this.price = data.price
		this.params = Array.isArray(data.params) ? data.params : JSON.parse(data.params)
		this.options = Array.isArray(data.options) ? data.options : JSON.parse(data.options)
	}
}
