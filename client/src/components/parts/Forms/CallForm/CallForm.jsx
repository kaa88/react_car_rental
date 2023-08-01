import { memo, useEffect, useRef } from 'react';
import { useForm } from '../../../../hooks/useForm';
import script from './CallForm.script.js';
import classes from './CallForm.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import Button from '../../../ui/Button/Button';
import Loader from '../../../ui/Loader/Loader';


const CallForm = memo(function CallForm() {

	const inputRef = useRef()
	useEffect(() => {
		script.init({
			change: form.fields.phone.change,
			inputEl: inputRef.current,
			phoneMask: '+_ (___) ___-__-__',
			showPhoneMask: true,
		})
		return () => script.destroy()
	}, [])

	const submit = async function() {
		const defaultMessage = {
			success: "Thank you. We'll call you soon",
			error: 'Error'
		}
		let message = ''

		if (form.fields.phone.value) {
			await script.send(form.fields.phone.value)
				.then(() => {
					message = defaultMessage.success
					form.fields.phone.clear()
					script.clear()
				})
				.catch(() => {
					message = defaultMessage.error
					form.fields.phone.setError(message)
					throw new Error(message)
				})
		}
		else form.clear()

		return message
	}

	const form = useForm({
		action: submit,
		fields: [
			{name: 'phone', type: 'phone', required: true},
		]
	})
	console.log(form);

	function getMessage() {
		if (form.fields.phone.message) return form.fields.phone.message
		else if (form.message) return form.message
		else return ''
	}

	return (
		<TranslateHandler>
			<form className={classes.form} action="#" onSubmit={form.submit}>
				{form.isPending && <Loader className={classes.loader} modif='light' />}

				<input
					type='text'
					className={classes.inputText}
					placeholder='?_Phone'
					ref={inputRef}
				/>

				<Button className={classes.button}>?_Call me back</Button>

				{!!getMessage() &&
					<p className={`${classes.formMessage} ${form.isError ? classes.error : ''}`}>
						?_{getMessage()}
					</p>
				}

			</form>
		</TranslateHandler>
	)
})

export default CallForm