import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveModal } from '../../../store/reducers/modalReducer'
import Utils from '../../../script/utilities';
import { scrollLock } from '../../../script/scrollLock';
import { transitionLock } from '../../../script/transLock';
import TranslateHandler from '../../TranslateHandler';
import classes from './Modal.module.scss';
import Icon from '../Icon/Icon';

const lockScroll = scrollLock.lock
const unlockScroll = scrollLock.unlock
const transitionIsLocked = transitionLock.check
const timeout = Utils.getCssVariable('timer-modal')*1000

// TODO: multi-window modal

const Modal = memo(function Modal({ className = '' }) {

	const dispatch = useDispatch()
	const {activeModal, content} = useSelector(state => state.modal)
	let [activeClass, setActiveClass] = useState('')

	useEffect(() => {
		if (activeModal && content) openModal()
		else closeModal()
	}, [activeModal, content])

	const contentRef = useRef()

	function openModal() {
		lockScroll()
		setActiveClass(classes.active)
		contentRef.current.scrollTo({top: 0})
	}
	function closeModal() {
		if (activeModal === null) return;
		if (transitionIsLocked(timeout)) return;
		unlockScroll(timeout)
		setActiveClass('')
		dispatch(setActiveModal(''))
	}

	return (
		<TranslateHandler>
			<div className={`${className} ${classes.default} ${activeModal} ${activeClass}`}>
				<div className={classes.closeArea} onClick={closeModal}></div>
				<div className={classes.wrapper}>
					<div className={classes.closeButton} onClick={closeModal}>
						<Icon name='icon-cross' />
					</div>
					<div className={classes.content} ref={contentRef}>
						{content}
					</div>
				</div>
			</div>
		</TranslateHandler>
	)
})

export default Modal
