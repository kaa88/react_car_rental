import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveModal } from '../../../store/slices/modalSlice'
import {getCssVariable} from '../../../utilities/utilities';
import { lockScroll, unlockScroll } from '../../../utilities/scrollLock';
import { transitionIsLocked } from '../../../utilities/transitionLock';
import TranslateHandler from '../../TranslateHandler';
import classes from './Modal.module.scss';
import Icon from '../Icon/Icon';
import ModalStaticContent, { staticNames } from './ModalStaticContent';
import { scriptManager } from '../../../utilities/scriptManager';

// TODO: multi-window modal

const timeout = getCssVariable('timer-modal') * 1000


const Modal = memo(function Modal({ className = '' }) {

	const dispatch = useDispatch()
	const modalStore = useSelector(state => state.modal)

	const defaultModal = {
		isActive: false,
		name: '',
		content: '',
	}
	let [modal, setModal] = useState(defaultModal)


	useEffect(() => {
		if (modalStore.active) openModal()
		else closeModal(true)
	}, [modalStore]) // eslint-disable-line react-hooks/exhaustive-deps

	const contentRef = useRef()

	function openModal() {
		lockScroll()
		setModal({
			isActive: true,
			name: modalStore.active,
			content: modalStore.content || getStaticContent()
		})
		contentRef.current.scrollTo({top: 0})
	}
	function closeModal(linkEvent) {
		if (!linkEvent && transitionIsLocked(timeout)) return;
		unlockScroll(timeout)
		dispatch(setActiveModal(''))
		setModal({...modal, isActive: false})
		setTimeout(() => {
			setModal(defaultModal)
		}, timeout)
	}

	function getStaticContent() {
		if (modalStore.content) return modalStore.content
		if (Object.keys(staticNames).includes(modalStore.active))
			return <ModalStaticContent name={modalStore.active}/>
	}

	useEffect(() => {
		scriptManager.registerFunctions('modal', {close: closeModal.bind(null, true)})
	}, []) // eslint-disable-line react-hooks/exhaustive-deps
	
	return (
		<TranslateHandler>
			<div className={`${className} ${classes.default} ${modal.isActive ? classes.active : ''}`} name={modal.name}>
				<div className={classes.closeArea} onClick={closeModal}></div>
				<div className={classes.wrapper}>
					<div className={classes.closeButton} onClick={closeModal}>
						<Icon name='icon-cross' />
					</div>
					<div className={classes.content} ref={contentRef}>
						{modal.content}
					</div>
				</div>
			</div>
		</TranslateHandler>
	)
})

export default Modal
