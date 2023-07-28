import { memo } from 'react';
import { useForm } from '../../../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { setActiveModal } from '../../../../store/slices/modalSlice';
import classes from './AccountForm.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import Button from '../../../ui/Button/Button';
import ModalLink from '../../../ui/Modal/ModalLink'
import InputText from '../../../ui/InputText/InputText';
import InputPassword from '../../../ui/InputPassword/InputPassword';
import Container from '../../../ui/Container/Container';
import UserService from '../../../../services/UserService';
import Loader from '../../../ui/Loader/Loader';


const LoginForm = memo(function LoginForm() {
	const dispatch = useDispatch()

	async function handleLogin() {
		let {error} = await UserService.login(form.fields.email.value, form.fields.password.value)
		if (error) {
			form.fields.email.setError()
			form.fields.password.setError()
			throw new Error(error)
		}
		dispatch(setActiveModal('user_logged_in'))
		form.clear()
	}

	const form = useForm({
		action: handleLogin,
		fields: [
			{name: 'email', type: 'email', required: true},
			{name: 'password', type: 'password', required: true},
		]
	})
	console.log(form);

	return (
		<TranslateHandler>
			<form className={classes.form} action="#" onSubmit={form.submit}>
				<Container className={classes.container}>
					{form.isPending && <Loader className={classes.loader} />}
					<div className={classes.title}>?_Sign in</div>
					<InputText
						className={`${classes.inputText} ${form.fields.email.isValid ? '' : classes.error}`}
						placeholder='?_E-mail'
						value={form.fields.email.value}
						onChange={form.fields.email.change}
					/>
					<InputPassword
						className={`${classes.inputPassword} ${form.fields.password.isValid ? '' : classes.error}`}
						placeholder='?_Password'
						value={form.fields.password.value}
						onChange={form.fields.password.change}
					/>
					<ModalLink name='restore_password' onClick={form.clear}>
						<div className={classes.link}>?_Forgot password</div>
					</ModalLink>
					<p className={`${classes.formMessage} ${form.isError ? classes.error : ''}`}>?_{form.message}</p>
					<Button className={classes.button}>?_Sign in</Button>
					<ModalLink name='register' onClick={form.clear}>
						<div className={`${classes.link} ${classes.centered}`}>?_Don't have account</div>
					</ModalLink>
				</Container>
			</form>
		</TranslateHandler>
	)
})

export default LoginForm