import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Popup.module.scss';
import TranslateHandler from '../../TranslateHandler';


const Popup = memo(function Popup({modif = 'default', className = '', name = '', children, ...props}) {

	const popup = useRef()
	// const dispatch = useDispatch()
	const activePopup = useSelector(state => state.formPopup.activePopup)
	let activeClass = activePopup === name ? classes.active : ''

	useEffect(() => {
		if (activePopup === name) {
			setTimeout(() => {
				popup.current.scrollIntoView({block: 'nearest', behavior: 'smooth'})
			}, 50)
		}
	})

	const rejectWindowClosePopupEvent = function(e) {
		e.stopPropagation()
	}

	return (
		<TranslateHandler>
			<div
				className={`${className} ${classes[modif]} ${activeClass}`}
				name={name}
				ref={popup}
				onClick={rejectWindowClosePopupEvent}
				{...props}
			>
				{children}
			</div>
		</TranslateHandler>
	)
})

export default Popup