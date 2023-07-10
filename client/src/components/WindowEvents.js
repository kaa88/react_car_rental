import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveSelect } from '../store/reducers/selectReducer'
import { setActivePopup } from '../store/reducers/popupReducer'


function WindowEvents() {

	const dispatch = useDispatch()

	useEffect(() => {
		window.addEventListener('click', () => dispatch(setActiveSelect('')))
		window.addEventListener('click', () => dispatch(setActivePopup('')))
	}, [])

	return null
}

export default WindowEvents
