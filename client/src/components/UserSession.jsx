import { useDispatch } from 'react-redux'
import { changeUserData } from '../store/slices/userSlice'
import { changeCurrency } from '../store/slices/currencySlice'
import { changeLanguage } from '../store/slices/languageSlice'
import UserService from '../services/UserService'


function UserSession() {

	const dispatch = useDispatch()
	UserService.dispatch = dispatch //?

	async function initSession() {
		console.log('init user session')
		let {ok, error, userData} = await UserService.getUserData()
		// if (ok && userData) updateStore(userData)
		// if (error) console.error(error)
	}
	
	const token = localStorage.getItem('token')
	if (token) initSession()

	return null
}

export default UserSession
