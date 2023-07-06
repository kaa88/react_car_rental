import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveModal } from '../../../store/reducers/modalReducer'
import Utils from '../../../script/utilities';
import { scrollLock } from '../../../script/scrollLock';
import TranslateHandler from '../../TranslateHandler';
import classes from './Modal.module.scss';
import Icon from '../Icon/Icon';

const lockScroll = scrollLock.lock
const unlockScroll = scrollLock.unlock
const timeout = Utils.getCssVariable('timer-modal')*1000


const Modal = memo(function Modal({className = '', children, ...props}) {

	const dispatch = useDispatch()
	const {activeModal, content} = useSelector(state => state.modal)
	let modif = activeModal ? activeModal : 'default'
	let [activeClass, setActiveClass] = useState('')

	useEffect(() => {
		if (activeModal) openModal()
		else closeModal()
	}, [activeModal])

	function openModal() {
		lockScroll()
		setActiveClass(classes.active)
	}
	function closeModal() {
		unlockScroll(timeout)
		setActiveClass('')
		dispatch(setActiveModal(''))
	}

	return (
		<TranslateHandler>
			<div className={`${className} ${classes[modif]} ${activeClass}`} {...props}>
				<div className={classes.closeArea} onClick={closeModal}></div>
				<div className={classes.wrapper}>
					<div className={classes.closeButton} onClick={closeModal}>
						<Icon name='icon-cross' />
					</div>
					<div className={classes.content}>
						{content}
					</div>
				</div>
			</div>
		</TranslateHandler>
	)
})

export default Modal