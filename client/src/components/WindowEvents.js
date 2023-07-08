import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveSelect } from '../store/reducers/selectReducer'


function WindowEvents(){

	const dispatch = useDispatch()

	function closeSelects() {
		console.log('close');
		dispatch(setActiveSelect(''))
	}

	useEffect(() => {
		window.addEventListener('click', closeSelects)
	}, [])

	return null
}

export default WindowEvents
