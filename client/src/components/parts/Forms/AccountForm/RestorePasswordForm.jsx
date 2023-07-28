import { memo } from 'react';
import { useForm } from '../../../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { setActiveModal } from '../../../../store/slices/modalSlice';
import classes from './AccountForm.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import Button from '../../../ui/Button/Button';
import InputText from '../../../ui/InputText/InputText';
import ModalLink from '../../../ui/Modal/ModalLink'
import Container from '../../../ui/Container/Container';
import Loader from '../../../ui/Loader/Loader';
import UserService from '../../../../services/UserService';


const RestorePasswordForm = memo(function RestorePasswordForm() {

	const dispatch = useDispatch()
	async function handleRestorePassword() {
		let {error} = await UserService.restorePassword(form.fields.email.value)
		if (error) {
			form.fields.email.setError()
			throw new Error(error)
		}
		dispatch(setActiveModal('user_logged_in'))
		form.clear()
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
					<ModalLink name='login' onClick={form.clear}>
						<div className={`${classes.link} ${classes.centered}`}>?_Return</div>
					</ModalLink>
				</Container>
			</form>
		</TranslateHandler>
	)
})

export default RestorePasswordForm