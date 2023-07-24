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

	async edit(userId, key, value) {
		// if (!key || !value) return console.log('Missing attributes')
		return api.put('/user/edit', {
				// id: localStorage.getItem(USER_ID),
				id: userId,
				[key]: value,
			})
			.then(response => ({ok: true}))
			.catch(error => handleError(error))
	},

	async changePassword(userId, currentPassword, newPassword) {
		return api.put('/user/changepassword', {
				id: userId,
				currentPassword,
				newPassword
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
	let {currency, language, ...userData} = data.userData

	if (token) localStorage.setItem(TOKEN, token)

	const dispatch = getDispatch()
	if (dispatch) {
		console.log(userData);
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
	// if (error instanceof AxiosError) return {error: error.response.data}
	return error
}
