import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Popup.module.scss';
import TranslateHandler from '../../TranslateHandler';


const Popup = memo(function Popup({modif = 'default', className = '', name = '', children, ...props}) {

	// const dispatch = useDispatch()
	const activePopup = useSelector(state => state.formPopup.activePopup)
	let activeClass = activePopup === name ? classes.active : ''

	const rejectWindowClosePopupEvent = function(e) {
		e.stopPropagation()
	}

	return (
		<TranslateHandler>
			<div className={`${className} ${classes[modif]} ${activeClass}`} onClick={rejectWindowClosePopupEvent} {...props}>
				{children}
			</div>
		</TranslateHandler>
	)
})

export default Popup