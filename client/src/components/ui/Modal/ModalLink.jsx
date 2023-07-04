import { memo, useEffect, useMemo, useRef, useState, cloneElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModalIsActive, setModalContent } from '../../../store/reducers/modalReducer'
// import Utils from '../../../script/utilities';
// import { scrollLock } from '../../../script/scrollLock';
// import TranslateHandler from '../../TranslateHandler';
// import classes from './ModalLink.module.scss';
// import Icon from '../Icon/Icon';

// const lockScroll = scrollLock.lock
// const unlockScroll = scrollLock.unlock
// const timeout = Utils.getCssVariable('timer-modal')*1000


const ModalLink = memo(function ModalLink({name = '', content, children, ...props}) {

	const dispatch = useDispatch()
	function showModal() {
		dispatch(setModalContent(content))
		dispatch(setModalIsActive(true))
	}

	const newProps = {...children.props, onClick: showModal}
	const updatedChild = cloneElement(children, newProps)

	return updatedChild
})

export default ModalLink
