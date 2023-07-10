import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOptions } from '../../../../../store/reducers/reservationFormReducer';
import classes from './Options.module.scss';
import TranslateHandler from '../../../../TranslateHandler';
import InputCheckbox from '../../../../ui/Checkbox/InputCheckbox';


const DRIVER_AGE = 'driver_age'
const DIFFERENT_LOCATION = 'different_location'

export const defaultOptions = {}
defaultOptions[DRIVER_AGE] = false
defaultOptions[DIFFERENT_LOCATION] = false

const Options = memo(function Options({className = '', ...props}) {

	const dispatch = useDispatch()
	const formDataOptions = useSelector(state => state.reservationForm.options)

	function setFormDataOptions(value) {
		dispatch(setOptions(value))
	}

	function handleCheckboxChange(name, value) {
		let newOptions = {...formDataOptions}
		newOptions[name] = value
		setFormDataOptions(newOptions)
	}

	// console.log('render Options');
	return (
		<TranslateHandler>
			<div className={`${className} ${classes.options}`} {...props}>

				<InputCheckbox
					name={DRIVER_AGE}
					onChange={handleCheckboxChange}
					checked={formDataOptions[DRIVER_AGE]}
					modif='light'
				>
					?_Driver's age 21+
				</InputCheckbox>

				<InputCheckbox
					name={DIFFERENT_LOCATION}
					onChange={handleCheckboxChange}
					checked={formDataOptions[DIFFERENT_LOCATION]}
					modif='light'
				>
					?_Return to different location
				</InputCheckbox>

			</div>
		</TranslateHandler>
	)
})

export default Options