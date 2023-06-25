import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePopup } from '../../../store/reducers/popupReducer';
// import script from './Popup.script';
import classes from './Popup.module.scss';
import TranslateHandler from '../../TranslateHandler';
// import { useCustomElement } from '../../../hooks/useCustomElement';



const Popup = memo(function Popup({modif = 'default', className = '', name = '', children, ...props}) {

	// const dispatch = useDispatch()
	const activePopup = useSelector(state => state.activePopup)
	let activeClass = activePopup === name ? classes.active : ''

	// const showPopup = function() {}

	// const hidePopups = function(e) {
	// 	console.log(e.currentTarget === window);
	// 	e.stopPropagation()
	// 	if (e.currentTarget === window) dispatch(setActivePopup(''))
	// }

	// const setupEvents = function() {
	// 	window.addEventListener('click', hidePopups)
	// }
	// const removeEvents = function() {
	// 	window.removeEventListener('click', hidePopups)
	// }

	// useEffect(() => {
	// 	setupEvents()
	// 	return () => removeEvents()
	// }, [])


	return (
		<TranslateHandler>
			<div className={`${className} ${classes[modif]} ${activeClass}`} {...props}>
				{children}
			</div>
		</TranslateHandler>
	)
})

export default Popup