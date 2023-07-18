import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveSelect } from '../store/slices/selectSlice'
import { setActivePopup } from '../store/slices/popupSlice'


function WindowEvents() {

	const dispatch = useDispatch()

	useEffect(() => {
		window.addEventListener('click', () => dispatch(setActiveSelect('')))
		window.addEventListener('click', () => dispatch(setActivePopup('')))
	}, [])

	return null
}

export default WindowEvents
