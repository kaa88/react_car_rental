import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import UserService from '../services/UserService'
import { changeUserData } from '../store/slices/userSlice'


function UserSession() {

	const dispatch = useDispatch()

	async function initSession() {
		console.log('init user session');
		let {ok, error, ...userData} = await UserService.getUserData()
		if (ok) dispatch(changeUserData(userData))
	}
	
	const token = localStorage.getItem('token')
	if (token) initSession()

	return null
}

export default UserSession
