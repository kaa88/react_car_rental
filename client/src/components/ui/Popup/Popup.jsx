import { memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Popup.module.scss';
import TranslateHandler from '../../TranslateHandler';
import Icon from '../Icon/Icon';
import { setActivePopup } from '../../../store/slices/popupSlice';


const Popup = memo(function Popup({modif = 'default', className = '', name = '', children, ...props}) {

	const popup = useRef()
	const dispatch = useDispatch()
	const activePopup = useSelector(state => state.popup.active)
	let activeClass = activePopup === name ? classes.active : ''

	useEffect(() => {
		if (activePopup === name) {
			setTimeout(() => {
				popup.current.scrollIntoView({block: 'nearest', behavior: 'smooth'})
			}, 50)
		}
	})

	const closePopup = function() {
		dispatch(setActivePopup(''))
	}

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
				<div className={classes.closeBtn} onClick={closePopup}>
					<Icon name='icon-cross' />
				</div>
				{children}
			</div>
		</TranslateHandler>
	)
})

export default Popup