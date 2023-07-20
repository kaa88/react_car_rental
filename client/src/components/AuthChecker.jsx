import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveSelect } from '../store/slices/selectSlice'
import { setActivePopup } from '../store/slices/popupSlice'
import UserService from '../services/user'


function AuthChecker() {

	const dispatch = useDispatch()

	async function checkUserAuth() {
		let token = localStorage.getItem('token')
		if (token && token !== 'null') UserService.check(token)
	}
	checkUserAuth()
	

	return null
}

export default AuthChecker
