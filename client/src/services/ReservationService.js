import api from "../api/api"
import { handleError } from "../services/ErrorService"


const ReservationService = {

	async getReservation() {
		return api.get('/reservation')
			.then(response => ({
				ok: true,
				data: response.data || []
			}))
			.catch(error => handleError(error))
	},

	async createReservation(formData) {
		if (!formData) return console.error('Creating reservation is failed: formData is missing')
		return api.post('/reservation', new ReservationDTO(formData))
			.then(response => ({ok: true}))
			.catch(error => handleError(error))
	},

	async editReservation(formData) {
		if (!formData) return console.error('Editing reservation is failed: formData is missing')
		return api.put('/reservation', JSON.stringify(new ReservationDTO(formData)))
			.then(response => ({ok: true}))
			.catch(error => handleError(error))
	},

	async setReservationInactive(id) {
		return api.put('/reservation', {id: Number(id), isInactive: true})
			.then(response => ({ok: true}))
			.catch(error => handleError(error))
	},

	async deleteReservation(id) {
		return api.delete(`/reservation?id=${Number(id)}`)
			.then(response => ({ok: true}))
			.catch(error => handleError(error))
	},

}
export default ReservationService


class ReservationDTO {
	constructor(formData = {}) {
		if (formData.id) this.id = formData.id
		if (formData.pickup) this.pickupDate = formData.pickup
		if (formData.return) this.returnDate = formData.return
		if (formData.location) this.location = formData.location
		if (formData.totalPrice) this.price = formData.totalPrice
		if (formData.isDifferentReturnLocation) this.sameLocationReturn = !formData.isDifferentReturnLocation
		if (formData.car?.id) this.carId = formData.car.id
	}
}
