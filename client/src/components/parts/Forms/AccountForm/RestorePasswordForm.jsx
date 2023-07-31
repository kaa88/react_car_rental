import { memo } from 'react';
import { useForm } from '../../../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { setActiveModal } from '../../../../store/slices/modalSlice';
import classes from './AccountForm.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import Button from '../../../ui/Button/Button';
import InputText from '../../../ui/InputText/InputText';
import Container from '../../../ui/Container/Container';
import Loader from '../../../ui/Loader/Loader';
import UserService from '../../../../services/UserService';
import OptionalLink from './OptionalLink';
import { useNavigate } from 'react-router-dom';

const DEFAULT_MOD = 'default'
const MODAL_MOD = 'modal'

const RestorePasswordForm = memo(function RestorePasswordForm({modif = DEFAULT_MOD}) {

	const navigate = useNavigate()
	const dispatch = useDispatch()
	async function handleRestorePassword() {
		let {error} = await UserService.restorePassword(form.fields.email.value)
		if (error) {
			form.fields.email.setError()
			throw new Error(error)
		}
		form.clear()
		if (modif === MODAL_MOD) dispatch(setActiveModal('user_logged_in'))
		else navigate('/')
	}

	const form = useForm({
		action: handleRestorePassword,
		fields: [
			{name: 'email', type: 'email', required: true},
		]
	})
	console.log(form);

	return (
		<TranslateHandler>
			<form className={classes.form} action="#" onSubmit={form.submit}>
				<Container className={classes.container}>
					{form.isPending && <Loader className={classes.loader} />}
					<div className={classes.title}>?_Restore password</div>

					<InputText
						className={`${classes.inputText} ${form.fields.email.isValid ? '' : classes.error}`}
						placeholder='?_E-mail'
						value={form.fields.email.value}
						onChange={form.fields.email.change}
					/>

					<p className={`${classes.formMessage} ${form.isError ? classes.error : ''}`}>?_{form.message}</p>
					<Button className={classes.button}>?_Restore</Button>

					<OptionalLink
						type={modif}
						path='login'
						className={`${classes.link} ${classes.centered}`}
						onClick={form.clear}
					>
						?_Return
					</OptionalLink>

				</Container>
			</form>
		</TranslateHandler>
	)
})

export default RestorePasswordForm