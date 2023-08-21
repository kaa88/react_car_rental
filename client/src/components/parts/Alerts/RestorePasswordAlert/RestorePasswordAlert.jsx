import classes from './RestorePasswordAlert.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import ModalLink from '../../../ui/Modal/ModalLink';
import Button from '../../../ui/Button/Button';

const RestorePasswordAlert = function({className = '', ...props}) {

	return (
		<TranslateHandler>
			<div className={`${className} ${classes.alert}`} {...props}>
				<p className={classes.title}>
					?_Check your e-mail for password restoration instructions
				</p>
				<ModalLink name=''>
					<Button className={classes.button}>?_Return</Button>
				</ModalLink>
			</div>
		</TranslateHandler>
	)
}

export default RestorePasswordAlert
