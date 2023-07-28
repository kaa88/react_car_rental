import api from "../api/api"
import { changeCurrency } from "../store/slices/currencySlice"
import { changeLanguage } from "../store/slices/languageSlice"
import { changeUserData } from "../store/slices/userSlice"

// const USER_ID = 'userId'


const UserService = {
	async getUserData() {
		console.log('getUserData');
		return api.get('/user')
			.then(response => {
				updateStorage(response.data)
				return {ok: true}
			})
			.catch(error => handleError(error))
	},

	async login(username, password) {
		return api.post('/user/login', {email: username, password})
			.then(response => {
				updateStorage(response.data)
				return {ok: true}
			})
			.catch(error => handleError(error))
	},

	async logout() {
		return api.post('/user/logout')
			.then(response => {
				clearStorage()
				return {ok: true}
			})
			.catch(error => handleError(error))
	},

	async register(username, password, currency = null, language = null, cookieAccepted = false) {
		return api.post('/user/add', {email: username, password, currency, language, cookieAccepted})
			.then(response => {
				updateStorage(response.data)
				return {ok: true}
			})
			.catch(error => handleError(error))
	},

	async edit(key, value) {
		return api.put('/user/edit', { [key]: value })
			.then(response => {
				updateStorage(response.data)
				return {ok: true}
			})
			.catch(error => handleError(error))
	},

	async changePassword(currentPassword, newPassword) {
		return api.put('/user/changepassword', {
				currentPassword,
				newPassword
			})
			.then(response => ({ok: true}))
			.catch(error => handleError(error))
	},

	async restorePassword(email) {
		return api.post('/user/restorepassword', {email})
			.then(response => ({ok: true}))
			.catch(error => handleError(error))
	},

	async changeImage(file) {
		// настроить формдату на сервере, а тут ок
		let formData = new FormData()
		formData.append('file', file)
		return api.post('/user/uploadimage', formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		})
			.then(response => ({ok: true}))
			.catch(error => handleError(error))
	},
}
export default UserService


const TOKEN = 'token'

function updateStorage(data) {
	console.log('updateStorage');
	console.log(data);
	let token = data.accessToken
	if (token) localStorage.setItem(TOKEN, token)

	let {currency, language, ...userData} = data.userData || {}

	const dispatch = getDispatch()
	if (dispatch) {
		dispatch(changeUserData(userData))
		dispatch(changeLanguage(language))
		dispatch(changeCurrency(currency))
	}
}
function clearStorage() {
	localStorage.removeItem(TOKEN)
	const dispatch = getDispatch()
	if (dispatch) dispatch(changeUserData(null))
}
function getDispatch() {
	const dispatch = UserService.dispatch
	if (dispatch) return dispatch
	console.error('Could not update "Store" because of missing "dispatch" function in "UserService". Check "UserSession" component is rendered.')
}
// function checkValue(value) {
// 	if (!value || value === 'null' || value === 'undefined') return ''
// 	return value
// }
function handleError(error) {
	console.error(error)
	const UNKNOWN_ERR = 'Unknown error'
	let errorMessage = error.message
	if (error.name && error.name === 'AxiosError') {
		if (error.response && error.response.status !== 404) errorMessage = error.response.data.message
	}
	if (!errorMessage) errorMessage = UNKNOWN_ERR
	return {error: errorMessage}
}
