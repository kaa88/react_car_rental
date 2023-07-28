import axios from "axios";

const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
	timeout: 3000,
})

api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (isRefreshing) return Promise.reject()
		if (error.response && error.response.status === 401) {
			isRefreshing = true
			let token = await refreshToken()
			if (token instanceof Error) return Promise.reject(token)
			isRefreshing = false
			let response = await repeatRequest(error.config.method, error.config.url)
			return response
		}
		else return Promise.reject(error)
	}
)

let isRefreshing = false

async function refreshToken() {
	return api.get('/user/refresh')
		.then(response => {
			localStorage.setItem('token', response.data)
		})
		.catch(error => error)
}
async function repeatRequest(method, url) {
	return api[method](url)
		.then(response => response)
		.catch(error => error)
}


export default api
