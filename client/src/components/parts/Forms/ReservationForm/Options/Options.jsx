import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setReservation } from '../../../../../store/slices/reservationFormSlice';
import classes from './Options.module.scss';
import TranslateHandler from '../../../../TranslateHandler';
import InputCheckbox from '../../../../ui/InputCheckbox/InputCheckbox';


const DRIVER_AGE = 'driverAgeIsOk'
const DIFFERENT_LOCATION_RETURN = 'isDifferentReturnLocation'

// export const defaultOptions = {}
// defaultOptions[DRIVER_AGE] = false
// defaultOptions[DIFFERENT_LOCATION_RETURN] = false

const Options = memo(function Options({modif = 'light', className = '', ...props}) {

	const dispatch = useDispatch()
	const formData = useSelector(state => state.reservationForm)
	const formDataOptions = {
		[DRIVER_AGE]: formData[DRIVER_AGE],
		[DIFFERENT_LOCATION_RETURN]: formData[DIFFERENT_LOCATION_RETURN]
	}

	function setFormDataOptions(value) {
		dispatch(setReservation({
			[DRIVER_AGE]: value[DRIVER_AGE],
			[DIFFERENT_LOCATION_RETURN]: value[DIFFERENT_LOCATION_RETURN]
		}))
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
					modif={modif}
				>
					?_Driver's age 21+
				</InputCheckbox>

				<InputCheckbox
					name={DIFFERENT_LOCATION_RETURN}
					onChange={handleCheckboxChange}
					checked={formDataOptions[DIFFERENT_LOCATION_RETURN]}
					modif={modif}
				>
					?_Return to different location
				</InputCheckbox>

			</div>
		</TranslateHandler>
	)
})

export default Options