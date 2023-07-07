import { memo } from 'react';
import classes from './AccountForm.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import Button from '../../../ui/Button/Button';
import ModalLink from '../../../ui/Modal/ModalLink'
import InputText from '../../../ui/InputText/InputText';
import InputPassword from '../../../ui/InputPassword/InputPassword';
import Container from '../../../ui/Container/Container';


const SigninForm = memo(function SigninForm() {

	function handleSignIn() {}

	return (
		<TranslateHandler>
			<form className={classes.form} action="#">
				<Container className={classes.container}>
					<div className={classes.title}>?_Sign in</div>

					<InputText className={classes.inputText} placeholder='?_E-mail' />
					<InputPassword className={classes.InputPassword} placeholder='?_Password' />

					<ModalLink name='restore_password'>
						<div className={classes.link}>?_Forgot password</div>
					</ModalLink>

					<Button className={classes.button} onClick={handleSignIn}>
						?_Sign in
					</Button>

					<ModalLink name='register'>
						<div className={`${classes.link} ${classes.centered}`}>?_Don't have account</div>
					</ModalLink>
				</Container>
			</form>
		</TranslateHandler>
	)
})

export default SigninForm