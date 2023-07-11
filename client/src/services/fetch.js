import api from "../api";
import { objectIsEmpty } from "./utilities";

// add fake data

const FetchService = {
	async getCurrency() {
		return api.get('/currency')
			.then(response => response.data)
			.catch(error => {
				console.log(error)
				return null
			})
	},
	async getCars() {
		return api.get('/cars')
			.then(response => response.data)
			.catch(error => {
				console.log(error)
				return null
			})
	},
	async getFeedback() {
		return api.get('/feedback')
			.then(response => response.data)
			.catch(error => {
				console.log(error)
				return null
			})
	},
}

export default FetchService

// async function fetchData(request) {
// 	if (!request || typeof request !== 'object') return null
// 	const { path='', method='GET', body={} } = request
// 	const entry = process.env.REACT_APP_API_URL
// 	let reqQuery = ''
// 	if (method === 'GET' && body && !objectIsEmpty(body)) reqQuery = `?${new URLSearchParams(body).toString()}`
// 	const fullPath = entry + path + reqQuery
	
// 	const headers = {
// 		'Content-Type': 'application/json;charset=utf-8'
// 	}

// 	const controller = new AbortController()
// 	let abortTimeout = setTimeout(() => {
// 		controller.abort()
// 		console.error(`"${path}" fetch has been aborted due to timeout`)
// 		return result
// 	}, FETCH_TIMEOUT)

// 	const fetchParams = {
// 		method,
// 		headers,
// 		signal: controller.signal
// 	}
// 	if (method !== 'GET') fetchParams.body = JSON.stringify(body)

// 	let result = null


// 	await fetch( fullPath, fetchParams )
// 	.then(response => {
// 		clearTimeout(abortTimeout)
// 		if (response.ok) return response.json()
// 	})
// 	.then(data => {
// 		if (data) result = data
// 	})
// 	.catch(error => {
// 		console.error(error)
// 	})
// 	return result
// }


