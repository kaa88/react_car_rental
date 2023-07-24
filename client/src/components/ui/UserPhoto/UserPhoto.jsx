import classes from './UserPhoto.module.scss';
import Icon from '../Icon/Icon';
import Image from '../Image/Image';


function UserPhoto({className = '', src = '', ...props}) {
	return (
		<div className={`${className} ${classes.wrapper}`} {...props}>
			<Icon className={classes.icon} name='icon-user' />
			<Image src={src} />
		</div>
	)
}

export default UserPhoto