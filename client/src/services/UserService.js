import api from "../api/api"

const USER_ID = 'userId'
const USER_EMAIL = 'userEmail'
const USER_ROLE = 'userRole'
const USER_IMAGE = 'userImage'
const TOKEN = 'token'
const CURRENCY = 'currency'
const LANGUAGE = 'language'

function updateStorage(data) {
	let token = checkValue(data.accessToken)
	if (token) localStorage.setItem(TOKEN, token)
	// localStorage.setItem(USER_ID, checkValue(data.userData.id))
	// localStorage.setItem(USER_EMAIL, checkValue(data.userData.email))
	// localStorage.setItem(USER_ROLE, checkValue(data.userData.role))
	// localStorage.setItem(USER_IMAGE, checkValue(data.userData.image))
	// localStorage.setItem(CURRENCY, checkValue(data.userData.currency))
	// localStorage.setItem(LANGUAGE, checkValue(data.userData.language))
}
function clearStorage() {
	localStorage.removeItem(TOKEN)
	// localStorage.removeItem(USER_ID)
	// localStorage.removeItem(USER_EMAIL)
	// localStorage.removeItem(USER_ROLE)
	// localStorage.removeItem(USER_IMAGE)
}
function checkValue(value) {
	if (!value || value === 'null') return ''
	return value
}


const UserService = {
	async register(username, password) {
		return api.post('/user/add', {email: username, password})
			.then(response => ({ok: true}))
			.catch(error => ({error: error.response.data}))
	},

	async login(username, password) {
		return api.post('/user/login', {email: username, password})
			.then(response => {
				updateStorage(response.data)
				return {ok: true, ...response.data.userData}
			})
			.catch(error => ({error: error.response}))
	},

	async logout() {
		return api.post('/user/logout')
			.then(response => {
				clearStorage()
				return {ok: true}
			})
	},

	async edit(key, value) {
		return api.put('/user/edit', {
				id: localStorage.getItem(USER_ID),
				[key]: value,
			})
			.then(response => ({ok: true}))
			.catch(error => ({error: error.response.data}))
	},

	async getUserData() {
		console.log('getUserData');
		return api.get('/user')
			.then(response => {
				console.log('update storage');
				updateStorage(response.data)
				return {ok: true, ...response.data.userData}
			})
			.catch(error => error)
	},
}

export default UserService