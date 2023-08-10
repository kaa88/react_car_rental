import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../../hooks/useForm';
import { setActiveModal } from '../../../../store/slices/modalSlice';
import classes from './AccountForm.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import Button from '../../../ui/Button/Button';
import InputText from '../../../ui/InputText/InputText';
import InputPassword from '../../../ui/InputPassword/InputPassword';
import InputCheckbox from '../../../ui/InputCheckbox/InputCheckbox';
import Container from '../../../ui/Container/Container';
import Loader from '../../../ui/Loader/Loader';
import UserService from '../../../../services/UserService';
import OptionalLink from './OptionalLink';
import { useNavigate } from 'react-router-dom';
import { getRandomId } from '../../../../utilities/utilities';

const DEFAULT_MOD = 'default'
const MODAL_MOD = 'modal'

const RegisterForm = memo(function RegisterForm({modif = DEFAULT_MOD}) {

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const userData = useSelector(state => state.user)
	const cookieAccepted = userData.cookieAccepted || false
	const language = useSelector(state => state.language.current)
	const currency = useSelector(state => state.currency.current)

	async function handleRegister() {
		let {error} = await UserService.register(form.fields.email.value, form.fields.password.value, currency, language, cookieAccepted)
		if (error) {
			if (error.match(/exist/)) form.fields.email.setError()
			if (error.match(/weak/)) form.fields.password.setError()
			throw new Error(error)
		}
		form.clear()
		if (modif === MODAL_MOD) dispatch(setActiveModal('user_logged_in'))
		else navigate('/')
	}

	async function createGuest() {
		let email = `${getRandomId(10)}@guest.user`
		let password = `0Gu-${getRandomId(4)}`
		let userName = `Guest-${getRandomId(5)}`
		let {error} = await UserService.registerGuest(email, password, currency, language, cookieAccepted, userName)
		if (error) return console.error(error)
		if (modif === MODAL_MOD) dispatch(setActiveModal('user_logged_in'))
		else navigate('/')
	}

	const form = useForm({
		action: handleRegister,
		fields: [
			{name: 'email', type: 'email', required: true},
			{name: 'password', type: 'password', required: true},
			{name: 'repeatPassword', type: 'password', required: true},
			{name: 'agreement', type: 'checkbox', required: true},
		]
	})

	return (
		<TranslateHandler>
			<form className={classes.form} action="#" onSubmit={form.submit}>
				<Container className={classes.container}>
					{form.isPending && <Loader className={classes.loader} />}
					<div className={classes.title}>?_Registration</div>

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
					<InputPassword
						className={`${classes.inputPassword} ${form.fields.repeatPassword.isValid ? '' : classes.error}`}
						placeholder='?_Repeat password'
						value={form.fields.repeatPassword.value}
						onChange={form.fields.repeatPassword.change}
					/>
					<InputCheckbox
						className={`${classes.checkbox} ${form.fields.agreement.isValid ? '' : classes.error}`}
						value={form.fields.agreement.value}
						onChange={form.fields.agreement.change}
						clickableText={false}
					>
						<span className={classes.checkboxText}>
							<span>?_I have read and agreed with</span>
							<a className={classes.link} href="/terms" target='_blank'>?_terms</a>
							<span>?_&</span>
							<a className={classes.link} href="/policy" target='_blank'>?_conditions</a>
						</span>
					</InputCheckbox>

					<p className={`${classes.formMessage} ${form.isError ? classes.error : ''}`}>?_{form.message}</p>
					<Button className={classes.button}>?_Register</Button>

					<OptionalLink
						type={modif}
						path='login'
						className={`${classes.link} ${classes.centered}`}
						onClick={form.clear}
					>
						?_Already have account
					</OptionalLink>

					<button className={classes.guestButton} type='button' onClick={createGuest}>
						?_Create new Guest account
					</button>

				</Container>
			</form>
		</TranslateHandler>
	)
})

export default RegisterForm
