import DefaultLayout from '../layouts/DefaultLayout';
import Reservation from '../../components/parts/Reservation/Reservation'
const EDIT_STATE = 'edit'

function ReservationPage() {
	// console.log(window.history.state)
	const isEditState = window.history.state.usr === EDIT_STATE ? true : false

	return (
		<DefaultLayout pageTitle='Reservation'>
			<Reservation edit={isEditState} />
		</DefaultLayout>
	)
}

export default ReservationPage