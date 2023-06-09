import api from "../api";

// TODO: add fake data

const FetchService = {
	async getCurrency() {
		return api.get('/currency')
			.then(response => response.data)
			.catch(error => {
				console.log(error)
				return {} //?
			})
	},
	async getCars() {
		return api.get('/cars')
			.then(response => response.data)
			.catch(error => {
				console.log(error)
				return {}
			})
	},
	async getFeedback() {
		return api.get('/feedback')
			.then(response => response.data)
			.catch(error => {
				console.log(error)
				return {}
			})
	},
}

export default FetchService
