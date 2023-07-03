import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveModal } from '../../../store/reducers/modalReducer'
import Utils from '../../../script/utilities';
import classes from './Modal.module.scss';
import Icon from '../Icon/Icon';
import { scrollLock } from '../../../script/scrollLock';

const lockScroll = scrollLock.lock
const unlockScroll = scrollLock.unlock


const Modal = memo(function Modal({modif = 'default', className = '', name = '', children, ...props}) {

	const dispatch = useDispatch()
	const activeModal = useSelector(state => state.modal)
	let activeClass = activeModal === name ? classes.active : ''

	if (activeClass) lockScroll()

	const timeout = Utils.getCssVariable('timer-modal')*1000

	function closeModal() {
		unlockScroll(timeout)
		dispatch(setActiveModal(''))
	}

	const rejectWindowClosePopupEvent = function(e) {
		e.stopPropagation()
	}

	return (
		<div className={`${className} ${classes[modif]} ${activeClass}`} {...props}>
			{/* <div className={`${classes.window} ${activeClass}`} name={name}> */}
				<div className={classes.closeArea} onClick={closeModal}></div>
				<div className={classes.wrapper}>
					<div className={classes.closeButton} onClick={closeModal}>
						<Icon name='icon-cross' />
					</div>
					<div className={classes.content}>
						{children}
					</div>
				</div>
			{/* </div> */}
		</div>
	)
})

export default Modal
