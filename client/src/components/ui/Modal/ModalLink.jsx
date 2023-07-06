import { memo, cloneElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveModal, setModalContent } from '../../../store/reducers/modalReducer'


const ModalLink = memo(function ModalLink({
	name = '',
	content = '',
	onClick: getContent = function(){},
	children,
	...props
}) {

	const dispatch = useDispatch()
	function showModal() {
		dispatch(setActiveModal(name))
		if (name) dispatch(setModalContent(getContent()))
	}

	const newProps = {...children.props, onClick: showModal}
	const updatedChild = cloneElement(children, newProps)

	return updatedChild
})

export default ModalLink
