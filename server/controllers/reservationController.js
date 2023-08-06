import ApiError from '../error.js'
import {defaultController} from './defaultController.js'
import {reservation} from '../models/models.js'
import UserService from '../services/UserService.js'

const REQUIRED_ROLE = 'USER'
const ADMIN_ROLE = 'ADMIN'

const reservationController = {
	async add(req, res, next) {
		if (!req.tokenData) return next(ApiError.internal())
		const userRoleIsOk = UserService.checkRole(REQUIRED_ROLE, req.tokenData.role)
		if (!userRoleIsOk) return next(ApiError.badRequest('You do not have sufficient rights to create new reservation'))

		req.body.userId = req.tokenData.id
		return await defaultController.add( req, res, next, reservation )
	},

	async edit(req, res, next) {
		if (!req.tokenData) return next(ApiError.internal())
		const userRoleIsOk = UserService.checkRole(REQUIRED_ROLE, req.tokenData.role)
		if (!userRoleIsOk) return next(ApiError.badRequest('You do not have sufficient rights to edit reservation'))

		let reservationId = req.body.id
		if (!reservationId) return next(ApiError.badRequest('Reservation not found'))
		let currentReservation = await reservation.findOne({where: {id: reservationId}})
		let reservationUserId = currentReservation?.dataValues.userId
		if (req.tokenData.id !== reservationUserId && req.tokenData.role !== ADMIN_ROLE)
			return next(ApiError.badRequest('You do not have sufficient rights to edit reservation'))

		req.body = new EditableFields(req.body)
		return await defaultController.edit( req, res, next, reservation )
	},

	async delete(req, res, next) {
		if (!req.tokenData) return next(ApiError.internal())
		const userRoleIsOk = UserService.checkRole(REQUIRED_ROLE, req.tokenData.role)
		if (!userRoleIsOk) return next(ApiError.badRequest('You do not have sufficient rights to edit reservation'))

		let reservationId = req.query.id
		if (!reservationId) return next(ApiError.badRequest('Reservation not found'))
		let currentReservation = await reservation.findOne({where: {id: Number(reservationId)}})
		let reservationUserId = currentReservation?.dataValues.userId
		if (req.tokenData.id !== reservationUserId && req.tokenData.role !== ADMIN_ROLE)
			return next(ApiError.badRequest('You do not have sufficient rights to edit reservation'))

		return await defaultController.delete( req, res, next, reservation )
	},

	async get(req, res, next) {
		if (!req.tokenData) return next(ApiError.internal())

		let {id} = req.tokenData
		let reservationList = await reservation.findAll({where: {userId: id}})
		if (!reservationList) return next(ApiError.badRequest('Reservations not found'))
		let newList = reservationList.map((item) => new ReservationDTO(item.dataValues))
		return res.json(newList)
	},

}
export default reservationController

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
		this.id = body.id // not editable, but needed to find user... may be I'll find better place for it later
		if (body.pickupDate) this.pickupDate = body.pickupDate
		if (body.returnDate) this.returnDate = body.returnDate
		if (body.location) this.location = body.location
		if (body.price) this.price = body.price
		if (body.carId) this.carId = body.carId
		if (body.isInactive) this.isInactive = body.isInactive
		if (body.sameLocationReturn) this.sameLocationReturn = body.sameLocationReturn
	}
}
