import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePopup } from '../../../../store/slices/popupSlice';
// import script from './ReservationForm.script';
import classes from './ReservationForm.module.scss';
import Location from './Location/Location';
import Period from './Period/Period';
import Options from './Options/Options';
import TranslateHandler from '../../../TranslateHandler';
import Button from '../../../ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../../../hooks/useForm';
import CarSelect from './CarSelect/CarSelect';
import Totals from './Totals/Totals';
import ReservationService from '../../../../services/ReservationService';
import { setActiveModal } from '../../../../store/slices/modalSlice';
import ModalLink from '../../../ui/Modal/ModalLink';

const MODIF_FULL = 'full'
const MODIF_SHORT = 'short'

const ReservationForm = memo(function ReservationForm({modif = MODIF_FULL, className = '', ...props}) {

	const isFullForm = modif === MODIF_FULL ? true : false

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const activeDataType = useSelector(state => state.popup.active)
	const formData = useSelector(state => state.reservationForm)


	function setActiveDataType(event, value) {
		console.log('setActiveDataType');
		let active = value
		if (event) {
			event.stopPropagation()
			if (event.currentTarget === window) active = ''
		}
		dispatch(setActivePopup(active))
	}

	useEffect(() => {
		window.addEventListener('click', setActiveDataType)
		return () => window.removeEventListener('click', setActiveDataType)
	}, [])

	function redirectToFullForm(e) {
		e.preventDefault()
		navigate('/reservation')
	}

	function showConfirmation() {
		const confirmContent =
			<div className={classes.confirmContent}>
				<p className={classes.confirmTitle}>Thanks for your reservation</p>
				<p>You can manage your reservations at</p>
				<Button className={classes.confirmButton} modif='negative' onClick={()=>{navigate('/account')}}>Account page</Button>
				<p>or continue at</p>
				<ModalLink name=''>
					<Button className={classes.confirmButton} onClick={()=>{navigate('/')}}>Home page</Button>
				</ModalLink>
			</div>;
		dispatch(setActiveModal({name: 'reservation_confirm', content: confirmContent}))
	}

	async function submit() {
		let response = await ReservationService.createReservation(formData)
		if (response.ok) showConfirmation()
		else throw new Error(response.error)
	}

	function customValidation() {
		const defaultErrorMessage = 'Fill in required fields'
		const ageErrorMessage = 'Driver must be 21+ years old'
		if (
			!formData.location ||
			!formData.pickup ||
			!formData.return ||
			!formData.car
		) return {message: defaultErrorMessage}
		else if (!formData.options.driverAgeIsOk) return {message: ageErrorMessage}
		else return {ok: true}
	}

	const form = useForm({
		customValidation,
		action: submit,
		// fields: [
		// 	{name: 'location', validate: false},
		// 	{name: 'pickupDate', validate: false},
		// 	{name: 'pickupTime', validate: false},
		// 	{name: 'returnDate', validate: false},
		// 	{name: 'returnTime', validate: false},
		// 	{name: 'driverAge', type: 'checkbox', validate: false},
		// 	{name: 'differentLocation', type: 'checkbox', validate: false},
		// ]
	})
	// console.log(form);

	const elemModif = modif === MODIF_FULL ? 'dark' : 'light'

	return (
		<TranslateHandler>
			<form action="#"
				className={`${className} ${classes[modif]}`}
				onSubmit={isFullForm ? form.submit : redirectToFullForm}
				{...props}
			>
				<Location
					className={classes.location}
					activeDataType={activeDataType}
					setActiveDataType={setActiveDataType}
					modif={elemModif}
				/>
				<Period
					className={classes.period}
					activeDataType={activeDataType}
					setActiveDataType={setActiveDataType}
					modif={elemModif}
				/>
				<Button className={classes.submitBtn}>?_Reserve</Button>

				<Options className={classes.options} modif={elemModif} />

				{isFullForm && <>
					<Totals className={classes.totals} />
					<CarSelect className={classes.carSelect} />
					<p className={classes.formMessage}>?_{form.message}fsdfwef</p>
					<Button className={`${classes.submitBtn} ${classes.submitBtn_bottom}`}>?_Reserve</Button>
				</>}
			</form>
		</TranslateHandler>
	)
})

export default ReservationForm