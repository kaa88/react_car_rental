import api from "../api"

const AuthService = {
	async register(username, password) {
		return api.post('/register', {username, password})
	},
	async login(username, password) {
		return api.post('/login', {username, password})
	},
	async logout() {
		return api.post('/logout')
	},
}

export default AuthService