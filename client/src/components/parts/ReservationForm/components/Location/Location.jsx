import { memo, useMemo, useState } from 'react';
// import script from './Location.script';
import classes from './Location.module.scss';
// import TranslateHandler from '../../../../TranslateHandler';
// import { useCustomElement } from '../../../hooks/useCustomElement';
// import Button from '../../ui/Button/Button';
// import Divider from '../../ui/Divider/Divider';
// import InputText from '../../ui/InputText/InputText';
// import InputCheckbox from '../../ui/Checkbox/InputCheckbox';
// import Select from '../../ui/Select/Select';

const Location = memo(function Location({className, ...props}) {


	// console.log('render form');
	return (
		<div className={classes.location}></div>
		// <TranslateHandler>
		// 	<form className={`${classes.form} ${className}`} action="#" {...props}>

		// 		<div className={classes.section}>
		// 			<p className={classes.sectionTitle}>?_Location</p>
		// 			<InputText className={classes.input} />
		// 		</div>
		// 		<Divider />

		// 		<div className={classes.section}>
		// 			<p className={classes.sectionTitle}>?_Pick up</p>
		// 			<InputText className={classes.input} modif='textCenter' />
		// 			<InputText className={classes.input} modif='textCenter' />

		// 			<div className={classes.selectPopup}>
		// 				{createMonthElem(monthId)}
		// 				<Divider className={classes.divider} modif='dark' />
		// 				{createMonthElem(monthId + 1, true)}
		// 			</div>

		// 			{/* <div className={classes.selectPopup}>{timeSelectPopup}</div> */}
		// 		</div>

		// 		<div className={classes.section}>
		// 			<p className={classes.sectionTitle}>?_Return</p>
		// 			<InputText className={classes.input} modif='textCenter' />
		// 			<InputText className={classes.input} modif='textCenter' />
		// 		</div>

		// 		<Divider />
		// 		<Button className={classes.submitBtn} type='submit'>?_Reserve</Button>

		// 		<div className={classes.checkboxes}>
		// 			<InputCheckbox>?_Driver's age 21+</InputCheckbox>
		// 			<InputCheckbox>?_Return to different location</InputCheckbox>
		// 		</div>
		// 	</form>
		// </TranslateHandler>
	)
})

export default Location