import { memo, useState } from 'react';
import { useForm } from '../../../../hooks/useForm';
import script from './CallForm.script.js';
import classes from './CallForm.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import Button from '../../../ui/Button/Button';
import InputText from '../../../ui/InputText/InputText';
import Loader from '../../../ui/Loader/Loader';


const CallForm = memo(function CallForm() {

	const submit = async function() {
		const defaultMessage = {
			success: "Thank you. We'll call you soon.",
			error: 'Error'
		}
		let message = ''

		if (form.fields.phone.value) {
			await script.send(form.fields.phone.value)
				.then(() => {
					message = defaultMessage.success
					form.fields.phone.clear()
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
		customValidation: preValidatePasswords,
		action: submit,
		fields: [
			{name: 'phone', type: 'phone', required: true},
		]
	})

	return (
		<TranslateHandler>
			<form className={classes.form} action="#" onSubmit={form.submit}>
				{form.isPending && <Loader className={classes.loader} />}

				<InputText
					className={classes.inputText}
					value={form.fields.phone.value}
					onChange={form.fields.phone.change}
					placeholder='?_Phone'
				/>

				<Button className={classes.button}>?_Call me back</Button>

			</form>
		</TranslateHandler>
	)
})

export default CallForm