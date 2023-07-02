import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePopup } from '../../../store/reducers/formPopupReducer';
// import script from './ReservationForm.script';
import classes from './ReservationForm.module.scss';
import TranslateHandler from '../../TranslateHandler';
import Location from './components/Location/Location';
import Period from './components/Period/Period';
import Button from '../../ui/Button/Button';
import Divider from '../../ui/Divider/Divider';
import Options from './components/Options/Options';
import e from 'cors';

/* TODO:
	make popup scroll into view on open (mobile)
*/

const ReservationForm = memo(function ReservationForm({className = '', ...props}) {

	const dispatch = useDispatch()
	const activeDataType = useSelector(state => state.formPopup.activePopup)
	const formData = useSelector(state => state.formData)
	// useEffect(() => {
	// })


	function setActiveDataType(event, value) {
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


	function handleSubmit(e) {
		e.preventDefault()
		console.log(formData);
		// go to next page
	}

	return (
		<TranslateHandler>
			<form className={`${classes.form} ${className}`} action="#" onSubmit={handleSubmit} {...props}>
				<Location className={classes.location} activeDataType={activeDataType} setActiveDataType={setActiveDataType} />
				<Period className={classes.period} activeDataType={activeDataType} setActiveDataType={setActiveDataType} />
				<Button className={classes.submitBtn} type='submit'>?_Reserve</Button>
				<Options className={classes.options} />
			</form>
		</TranslateHandler>
	)
})

export default ReservationForm