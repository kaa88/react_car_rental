import classes from './UserPhoto.module.scss';
import Icon from '../Icon/Icon';
import Image from '../Image/Image';


function UserPhoto({className = '', src = '', ...props}) {
	return (
		<div className={`${className} ${classes.box}`} {...props}>
			<Icon name='icon-user' />
			<Image src={src} />
		</div>
	)
}
// доделать юзерфото

export default UserPhoto