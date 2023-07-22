import { memo, useState } from 'react';
import classes from './AccountForm.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import Button from '../../../ui/Button/Button';
import ModalLink from '../../../ui/Modal/ModalLink'
import InputText from '../../../ui/InputText/InputText';
import InputPassword from '../../../ui/InputPassword/InputPassword';
import Container from '../../../ui/Container/Container';
import UserService from '../../../../services/UserService';
import { useDispatch } from 'react-redux';
import { changeUserData } from '../../../../store/slices/userSlice';
import { setActiveModal, setModalContent } from '../../../../store/slices/modalSlice';


const LoginForm = memo(function LoginForm() {

	const dispatch = useDispatch()

	let [email, setEmail] = useState('')
	let [password, setPassword] = useState('')
	let [error, setError] = useState('')

	const handleEmailInput = function(e) {
		setEmail(e.target.value)
	}
	const handlePasswordInput = function(e) {
		setPassword(e.target.value)
	}

	async function handleLogin(e) {
		e.preventDefault()
		if (!email || !password) return setError('Missing email or password')
		let {ok, error} = await UserService.login(email, password)
		if (ok) {
			setError('')
			// dispatch(changeUserData(userData))
			dispatch(setActiveModal('user_logged_in'))
		}
		if (error) {
			setError(error.message)
			// dispatch(changeUserData({isAuth: false}))
		}
	}

	return (
		<TranslateHandler>
			<form className={classes.form} action="#">
				<Container className={classes.container}>
					<div className={classes.title}>?_Sign in</div>

					<InputText className={classes.inputText} placeholder='?_E-mail' value={email} onChange={handleEmailInput} />
					<InputPassword className={classes.InputPassword} placeholder='?_Password' value={password} onChange={handlePasswordInput} />

					<ModalLink name='restore_password'>
						<div className={classes.link}>?_Forgot password</div>
					</ModalLink>

					{error && <p>{error}</p>}

					<Button className={classes.button} type='submit' onClick={handleLogin}>
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

export default LoginForm