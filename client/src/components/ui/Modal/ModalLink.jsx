import { memo, cloneElement } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveModal, setModalContent } from '../../../store/reducers/modalReducer';
import ModalStaticContent from './ModalStaticContent';
import {getCssVariable} from '../../../utilities/utilities';
import { transitionIsLocked } from '../../../utilities/transitionLock';

const timeout = getCssVariable('timer-modal')*1000

const ModalLink = memo(function ModalLink({ name = '', content = '', children }) {
	
	const dispatch = useDispatch()

	function getContent() {
		if (name) {
			if (content) {
				if (typeof content === 'function') return content()
				else return content
			}
			else return <ModalStaticContent name={name} />
		}
		else return ''
	}

	function showModal() {
		if (transitionIsLocked(timeout)) return;
		dispatch(setActiveModal(name))
		if (name) dispatch(setModalContent(getContent()))
	}

	const newProps = {...children.props, onClick: showModal}
	const updatedChild = cloneElement(children, newProps)

	return updatedChild
})

export default ModalLink
