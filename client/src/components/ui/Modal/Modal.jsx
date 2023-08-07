import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveModal } from '../../../store/slices/modalSlice'
import {getCssVariable} from '../../../utilities/utilities';
import { lockScroll, unlockScroll } from '../../../utilities/scrollLock';
import { transitionIsLocked } from '../../../utilities/transitionLock';
import TranslateHandler from '../../TranslateHandler';
import classes from './Modal.module.scss';
import Icon from '../Icon/Icon';
import ModalStaticContent, { names } from './ModalStaticContent';
import { scriptManager } from '../../../utilities/scriptManager';

// TODO: multi-window modal

const timeout = getCssVariable('timer-modal')*1000


const Modal = memo(function Modal({ className = '' }) {

	const dispatch = useDispatch()
	const {active: activeModal, content} = useSelector(state => state.modal)
	let [activeClass, setActiveClass] = useState('')
	let [activeModalForCss, setActiveModalForCss] = useState('')

	let modalContent = ''
	if (activeModal && Object.keys(names).includes(activeModal))
		modalContent = <ModalStaticContent name={activeModal} />
	else modalContent = content

	useEffect(() => {
		if (activeModal && content) openModal()
		else {
			closeModal(true)
			setTimeout(() => {
				setActiveModalForCss(activeModal) // this one is set with timeout to prevent style changes during the animation
			}, timeout)
		}
	}, [activeModal, content])

	const contentRef = useRef()

	function openModal() {
		lockScroll()
		setActiveClass(classes.active)
		setActiveModalForCss(activeModal)
		contentRef.current.scrollTo({top: 0})
	}
	function closeModal(linkEvent) {
		if (activeModal === null) return;
		if (!linkEvent && transitionIsLocked(timeout)) return;
		unlockScroll(timeout)
		setActiveClass('')
		dispatch(setActiveModal(''))
	}

	useEffect(() => {
		scriptManager.registerFunctions('modal', {close: closeModal.bind(null, true)})
	}, [])
	
	return (
		<TranslateHandler>
			<div className={`${className} ${classes.default} ${activeClass}`} name={activeModalForCss}>
				<div className={classes.closeArea} onClick={closeModal}></div>
				<div className={classes.wrapper}>
					<div className={classes.closeButton} onClick={closeModal}>
						<Icon name='icon-cross' />
					</div>
					<div className={classes.content} ref={contentRef}>
						{modalContent}
					</div>
				</div>
			</div>
		</TranslateHandler>
	)
})

export default Modal
