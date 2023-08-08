import ApiError from '../error.js'
import {defaultController} from './defaultController.js'
import {reservation} from '../models/models.js'
import UserService from '../services/UserService.js'

const REQUIRED_ROLE = 'GUEST'
const ADMIN_ROLE = 'ADMIN'


const reservationController = {
	async get(req, res, next) {
		let {ok, error} = prepare(req, res, next, 'get')
		if (!ok) return error

		req.query.userId = req.tokenData.id
		let reservationList = await defaultController.get( req, res, next, reservation, true )
		let data = reservationList.map((item) => new ReservationDTO(item.dataValues))
		return res.json(data)
	},

	async add(req, res, next) {
		let {ok, error} = prepare(req, res, next, 'create')
		if (!ok) return error

		req.body.userId = req.tokenData.id
		return await defaultController.add( req, res, next, reservation )
	},

	async edit(req, res, next) {
		let {ok, error} = prepare(req, res, next, 'edit')
		if (!ok) return error

		let isAllowed = await checkEditIsAllowed(req, res, next)
		if (!isAllowed.ok) return isAllowed.error
		
		req.body = new EditableFields(req.body)
		return await defaultController.edit( req, res, next, reservation )
	},

	async delete(req, res, next) {
		let {ok, error} = prepare(req, res, next, 'delete')
		if (!ok) return error

		let isAllowed = await checkEditIsAllowed(req, res, next)
		if (!isAllowed.ok) return isAllowed.error

		return await defaultController.delete( req, res, next, reservation )
	},
}
export default reservationController


function prepare(req, res, next, action) {
	if (!req.tokenData?.id) return {error: next(ApiError.internal('Token middleware malfunction'))}

	let userRoleIsOk = UserService.checkRole(REQUIRED_ROLE, req.tokenData.role)
	if (!userRoleIsOk) return {error: next(ApiError.forbidden(`Only users with role '${REQUIRED_ROLE}' or above can ${action} reservations`))}

	return {ok: true}
}

async function checkEditIsAllowed(req, res, next) {
	let reservationId = req.query.id || req.body.id
	if (!reservationId) return {error: next(ApiError.badRequest(`Missing attribute 'id'`))}
	let currentReservation = await reservation.findOne({where: {id: Number(reservationId)}})
	if (!currentReservation) return {error: next(ApiError.badRequest('Reservation not found'))}
	let reservationUserId = currentReservation.dataValues?.userId
	if (req.tokenData.id !== reservationUserId && req.tokenData.role !== ADMIN_ROLE)
		return {error: next(ApiError.forbidden(`You do not have sufficient rights to edit other users' reservations`))}

	return {ok: true}
}

class ReservationDTO {
	constructor(r) {
		this.id = r.id
		this.carId = r.carId
		this.userId = r.userId
		this.pickupDate = r.pickupDate
		this.returnDate = r.returnDate
		this.location = r.location
		this.price = r.price
		this.isInactive = r.isInactive
		this.sameLocationReturn = r.sameLocationReturn
	}
}

class EditableFields {
	constructor(body) {
		this.id = body.id // not editable, but needed to find user
		if (body.pickupDate) this.pickupDate = body.pickupDate
		if (body.returnDate) this.returnDate = body.returnDate
		if (body.location) this.location = body.location
		if (body.price) this.price = body.price
		if (body.carId) this.carId = body.carId
		if (body.isInactive) this.isInactive = body.isInactive
		if (body.sameLocationReturn) this.sameLocationReturn = body.sameLocationReturn
	}
}
