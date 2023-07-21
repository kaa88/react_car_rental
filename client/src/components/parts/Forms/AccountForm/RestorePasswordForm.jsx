import { memo } from 'react';
import classes from './AccountForm.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import Button from '../../../ui/Button/Button';
import InputText from '../../../ui/InputText/InputText';
import ModalLink from '../../../ui/Modal/ModalLink'
import Container from '../../../ui/Container/Container';


const RestorePasswordForm = memo(function RestorePasswordForm() {

	function handleRestorePassword() {}

	return (
		<TranslateHandler>
			<form className={classes.form} action="#">
				<Container className={classes.container}>
					<div className={classes.title}>?_Restore password</div>
					<InputText className={classes.inputText} placeholder='?_E-mail' />
					<Button className={classes.button} onClick={handleRestorePassword}>?_Restore</Button>
					<ModalLink name='login'>
						<div className={`${classes.link} ${classes.centered}`}>?_Return</div>
					</ModalLink>
				</Container>
			</form>
		</TranslateHandler>
	)
})

export default RestorePasswordForm