import axios from "axios";

const settings = {
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
	timeout: 10000,
}

const api = axios.create(settings)
const apiTokenRefresh = axios.create(settings)

api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			let response = await refreshToken()
			if (response instanceof Error) return Promise.reject(response)
			response = await repeatRequest(error.config.method, error.config.url)
			return response
		}
		else return Promise.reject(error)
	}
)


async function refreshToken() {
	return apiTokenRefresh.get('/user/refresh')
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
