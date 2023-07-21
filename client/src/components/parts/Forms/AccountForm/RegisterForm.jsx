import { memo } from 'react';
import classes from './AccountForm.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import Button from '../../../ui/Button/Button';
import ModalLink from '../../../ui/Modal/ModalLink'
import InputText from '../../../ui/InputText/InputText';
import InputPassword from '../../../ui/InputPassword/InputPassword';
import InputCheckbox from '../../../ui/Checkbox/InputCheckbox';
import Container from '../../../ui/Container/Container';


const RegisterForm = memo(function RegisterForm() {

	function handleRegister() {}

	return (
		<TranslateHandler>
			<form className={classes.form} action="#">
				<Container className={classes.container}>
					<div className={classes.title}>?_Registration</div>

					<InputText className={classes.inputText} placeholder='?_E-mail' />
					<InputPassword className={classes.InputPassword} placeholder='?_Password' />
					<InputPassword className={classes.InputPassword} placeholder='?_Repeat password' />

					<InputCheckbox className={classes.checkbox} clickableText={false}>
						<span className={classes.checkboxText}>
							<span>?_I have read and agreed with</span>
							<a className={classes.link} href="#" target='_blank'>?_terms</a>
							<span>?_&</span>
							<a className={classes.link} href="#" target='_blank'>?_conditions</a>
						</span>
					</InputCheckbox>

					<Button className={classes.button} onClick={handleRegister}>
						?_Register
					</Button>

					<ModalLink name='login'>
						<div className={`${classes.link} ${classes.centered}`}>?_Already have account</div>
					</ModalLink>
				</Container>
			</form>
		</TranslateHandler>
	)
})

export default RegisterForm