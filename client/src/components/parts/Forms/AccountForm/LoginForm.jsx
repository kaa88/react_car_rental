import { memo } from 'react';
import { useForm } from '../../../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { setActiveModal } from '../../../../store/slices/modalSlice';
import classes from './AccountForm.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import Button from '../../../ui/Button/Button';
import InputText from '../../../ui/InputText/InputText';
import InputPassword from '../../../ui/InputPassword/InputPassword';
import Container from '../../../ui/Container/Container';
import UserService from '../../../../services/UserService';
import Loader from '../../../ui/Loader/Loader';
import OptionalLink from './OptionalLink';
import { useNavigate } from 'react-router-dom';

const DEFAULT_MOD = 'default'
const MODAL_MOD = 'modal'

const LoginForm = memo(function LoginForm({modif = DEFAULT_MOD}) {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	async function handleLogin() {
		let {error} = await UserService.login(form.fields.email.value, form.fields.password.value)
		if (error) {
			form.fields.email.setError()
			form.fields.password.setError()
			throw new Error(error)
		}
		form.clear()
		if (modif === MODAL_MOD) dispatch(setActiveModal('user_logged_in'))
		else navigate('/')
	}

	const form = useForm({
		action: handleLogin,
		fields: [
			{name: 'email', type: 'email', required: true},
			{name: 'password', type: 'password', required: true},
		]
	})

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

					<OptionalLink
						type={modif}
						path='restore_password'
						className={classes.link}
						onClick={form.clear}
					>
						?_Forgot password
					</OptionalLink>

					<p className={`${classes.formMessage} ${form.isError ? classes.error : ''}`}>{`?_${form.message}`}</p>
					<Button className={classes.button}>?_Sign in</Button>

					<OptionalLink
						type={modif}
						path='register'
						className={`${classes.link} ${classes.centered}`}
						onClick={form.clear}
					>
						?_Don't have account
					</OptionalLink>
					
				</Container>
			</form>
		</TranslateHandler>
	)
})

export default LoginForm