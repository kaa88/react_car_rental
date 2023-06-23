import { memo, useMemo, useState } from 'react';
import script from './ReservationForm.script';
import classes from './ReservationForm.module.scss';
import TranslateHandler from '../../TranslateHandler';
import { useCustomElement } from '../../../hooks/useCustomElement';
import Button from '../../ui/Button/Button';
import Divider from '../../ui/Divider/Divider';
import InputCheckbox from '../../ui/Checkbox/InputCheckbox';
import Period from './components/Period/Period';
import Location from './components/Location/Location';

const ReservationForm = memo(function ReservationForm({className = '', ...props}) {

	return (
		<TranslateHandler>
			<form className={`${classes.form} ${className}`} action="#" {...props}>
				<Location />
				<Divider />
				<Period />
				<Divider />
				<Button className={classes.submitBtn} type='submit'>?_Reserve</Button>
				<div className={classes.checkboxes}>
					<InputCheckbox>?_Driver's age 21+</InputCheckbox>
					<InputCheckbox>?_Return to different location</InputCheckbox>
				</div>
			</form>
		</TranslateHandler>
	)
})

export default ReservationForm