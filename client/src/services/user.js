import api from "../api/api"

const UserService = {
	async register(username, password) {
		return api.post('/user/add', {email: username, password})
	},
	async login(username, password) {
		return api.post('/user/login', {email: username, password})
			.then(response => {
				localStorage.setItem('userId', response.data.id)
				localStorage.setItem('userEmail', response.data.email)
				localStorage.setItem('currency', response.data.currency)
				localStorage.setItem('language', response.data.language)
				localStorage.setItem('token', response.data.accessToken)
				localStorage.setItem('userRole', response.data.role)
				localStorage.setItem('userImage', response.data.image)
				return {ok: true}
			})
			.catch(error => ({
				error: error.response.data
			}))
	},
	async logout() {
		return api.post('/user/logout', {id: localStorage.getItem('userId')})
		.then(response => {
			localStorage.removeItem('userId')
			localStorage.removeItem('userEmail')
			localStorage.removeItem('token')
			localStorage.removeItem('userRole')
			localStorage.removeItem('userImage')
			return {ok: true}
		})
		.catch(error => ({
			error: error.response.data
		}))
	},
	async edit(key, value) {
		return api.put('/user/edit', {
			id: localStorage.getItem('userId'),
			[key]: value,
		})
		.then(response => response.data)
		.catch(error => ({
			error: error.response.data
		}))
	},
}

export default UserService