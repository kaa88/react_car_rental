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

const MODIF_FULL = 'full'
const MODIF_SHORT = 'short'

const ReservationForm = memo(function ReservationForm({modif = MODIF_FULL, className = '', ...props}) {

	const isFullForm = modif === MODIF_FULL ? true : false

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const activeDataType = useSelector(state => state.popup.active)
	const formData = useSelector(state => state.reservationForm)
	// useEffect(() => {
	// })



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

	function submit(e) {
		e.preventDefault()
		console.log(formData);


		const defaultMessage = {
			success: 'Changes are saved',
			error: 'Error'
		}
		let okCount = 0, errors = [], message = ''


	}

	function customValidation() {
		const defaultErrorMessage = 'Fill in required fields'
		const ageErrorMessage = 'Driver must be 21+ years old'
		if (
			!formData.location ||
			!formData.pickup ||
			!formData.return
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
	console.log(form);


	return (
		<TranslateHandler>
			<form className={`${className} ${classes[modif]}`} action="#" onSubmit={isFullForm ? form.submit : redirectToFullForm} {...props}>
				<Location className={classes.location} activeDataType={activeDataType} setActiveDataType={setActiveDataType} />
				<Period className={classes.period} activeDataType={activeDataType} setActiveDataType={setActiveDataType} />
				<Button className={classes.submitBtn}>?_Reserve</Button>
				<p className={`${classes.formMessage} ${form.isError ? classes.error : ''}`}>?_{form.message}</p>
				<Options className={classes.options} />
				{isFullForm && <>
					<CarSelect />
					<Totals />
				</>}
			</form>
		</TranslateHandler>
	)
})

export default ReservationForm