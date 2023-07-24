import api from "../api/api";

// TODO: add fake data

const FetchService = {
	async getCurrency() {
		return api.get('/currency')
			.then(response => response.data || [])
			.catch(error => {
				console.log(error)
				return []
			})
	},
	async getCars() {
		return api.get('/cars')
			.then(response => response.data || [])
			.catch(error => {
				console.log(error)
				return []
			})
	},
	async getCarParams() {
		return api.get('/carparams')
			.then(response => response.data || [])
			.catch(error => {
				console.log(error)
				return []
			})
	},
	async getCarOptions() {
		return api.get('/caroptions')
			.then(response => response.data || [])
			.catch(error => {
				console.log(error)
				return []
			})
	},
	async getFeedback() {
		return api.get('/feedback?max=5&order=desc')
			.then(response => response.data || [])
			.catch(error => {
				console.log(error)
				return []
			})
	},
}

export default FetchService
