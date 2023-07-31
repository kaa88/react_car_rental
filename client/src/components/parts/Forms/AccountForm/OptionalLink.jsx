import { Link } from 'react-router-dom';
import ModalLink from '../../../ui/Modal/ModalLink'

const OptionalLink = function({
	type = 'default',
	path = '',
	className = '',
	onClick = ()=>{},
	children
}) {

	const getDefaultLink = () =>
		<Link className={className} to={'/' + path}>
			{children}
		</Link>;
	
	const getModalLink = () =>
		<ModalLink name={path} onClick={onClick}>
			<div className={className}>{children}</div>
		</ModalLink>;

	return type === 'modal' ? getModalLink() : getDefaultLink()
}

export default OptionalLink