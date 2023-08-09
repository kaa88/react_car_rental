import DefaultLayout from '../layouts/DefaultLayout';
import Reservation from '../../components/parts/Reservation/Reservation'
// import { Navigate, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { resetReservation } from '../../store/slices/reservationFormSlice';

// const RESERVATION = 'reservationForm'
const EDIT_STATE = 'edit'

function ReservationPage() {
	// const navigate = useNavigate()
	// const dispatch = useDispatch()
	// useEffect(() => {
	// 	return () => {dispatch(resetReservation())}
	// }, [])

	// console.log(window.history.state)
	const isEditState = window.history.state.usr === EDIT_STATE ? true : false

	// let formID = useSelector(state => state[RESERVATION].id)
	// if (isEditState) {
	// 	if (!formID) {
	// 		let sessionData = sessionStorage.getItem(RESERVATION)
	// 		formID = !!sessionData && JSON.parse(sessionData).id
	// 	}
	// 	if (!formID) return navigate(-1, {replace: true})
	// 	// if (!formID) return <Navigate to={-1} replace={true} />
	// }

	return (
		<DefaultLayout pageTitle='Reservation'>
			<Reservation edit={isEditState} />
		</DefaultLayout>
	)
}

export default ReservationPage