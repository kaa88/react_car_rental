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
		if (cache.cars) return cache.cars
		return api.get('/cars')
			.then(response => {
				let data = response.data || []
				return cache.cars = data
			})
			.catch(error => {
				console.log(error)
				return []
			})
	},
	async getCarParams() {
		if (cache.carParams) return cache.carParams
		return api.get('/carparams')
		.then(response => {
			let data = response.data || []
			return cache.carParams = data
		})
		.catch(error => {
				console.log(error)
				return []
			})
	},
	async getCarOptions() {
		if (cache.carOptions) return cache.carOptions
		return api.get('/caroptions')
		.then(response => {
			let data = response.data || []
			return cache.carOptions = data
		})
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


const cache = {
	cars: null,
	carParams: null,
	carOptions: null,
}