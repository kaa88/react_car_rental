import api from "../api/api";


const FetchService = {
	async getCars() {
		return await defaultGet('cars')
	},
	async getCarParams() {
		return await defaultGet('carparams')
	},
	async getCarOptions() {
		return await defaultGet('caroptions')
	},
	async getCurrency() {
		return await defaultGet('currency')
	},
	async getFeedback() {
		return await defaultGet('feedback', 'feedback?max=5&order=desc')
	},
}
export default FetchService


async function defaultGet(name, endpoint) {
	if (!name) return;
	if (!endpoint) endpoint = name
	if (cache[name]) return cache[name]
	return api.get(`/${endpoint}`)
		.then(response => {
			let data = response.data || []
			return cache[name] = data
		})
		.catch(error => {
			console.log(error)
			return []
		})
}

const cache = {
	cars: null,
	carparams: null,
	caroptions: null,
	currency: null,
	feedback: null,
}
