import { useSelector } from 'react-redux';
import classes from './UserLoggedInAlert.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import ModalLink from '../../../ui/Modal/ModalLink';
import Button from '../../../ui/Button/Button';

const UserLoggedInAlert = function({className = '', ...praps}) {

	const username = useSelector(state => state.user.email)

	return (
		<TranslateHandler>
			<div className={`${className} ${classes.alert}`} {...praps}>
				<p className={classes.title}>
					?_Greetings
				</p>
				<p className={classes.username}>
					{username}
				</p>
				<ModalLink name=''>
					<Button className={classes.button}>?_Hello!</Button>
				</ModalLink>
			</div>
		</TranslateHandler>
	)
}

export default UserLoggedInAlert
