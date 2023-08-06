import api from "../api/api"
import { handleError } from "../services/ErrorService"


const ReservationService = {

	async createReservation(formData) {
		if (!formData) return console.error('Creating reservation is failed: formData is missing')
		return api.post('/reservation', new ReservationDTO(formData))
			.then(response => ({ok: true}))
			.catch(error => handleError(error))
	},

	async editReservation(reservationId) {
		reservationId = Number(reservationId)
		return api.put('/reservation', {id: reservationId})
			.then(response => ({ok: true}))
			.catch(error => handleError(error))
	},

	async setReservationInactive(reservationId) {
		reservationId = Number(reservationId)
		return api.put('/reservation', {id: reservationId, isInactive: true})
			.then(response => ({ok: true}))
			.catch(error => handleError(error))
	},

	async deleteReservation(reservationId) {
		reservationId = Number(reservationId)
		return api.delete(`/reservation?id=${reservationId}`)
			.then(response => ({ok: true}))
			.catch(error => handleError(error))
	},

	async getReservation() {
		return api.get('/reservation')
			.then(response => response.data || [])
			.catch(error => handleError(error))
	},

}
export default ReservationService


class ReservationDTO {
	constructor(formData = {}) {
		if (formData.pickup) this.pickupDate = formData.pickup
		if (formData.return) this.returnDate = formData.return
		if (formData.location) this.location = formData.location
		if (formData.totalPrice) this.price = formData.totalPrice
		if (formData.options?.isDifferentReturnLocation) this.sameLocationReturn = formData.options.isDifferentReturnLocation
		if (formData.car?.id) this.carId = formData.car.id
	}
}
