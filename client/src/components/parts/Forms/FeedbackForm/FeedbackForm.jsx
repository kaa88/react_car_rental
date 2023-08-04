import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../../../hooks/useForm';
import classes from './FeedbackForm.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import Button from '../../../ui/Button/Button';
import InputText from '../../../ui/InputText/InputText';
import UserService from '../../../../services/UserService';
import Loader from '../../../ui/Loader/Loader';
import Container from '../../../ui/Container/Container';
import Rating from '../../../ui/Rating/Rating';


const FeedbackForm = memo(function FeedbackForm() {

	const userData = useSelector(state => state.user)
	const userName = userData ? userData.name : ''

	function setNameAsAccountName() {
		form.fields.userName.change(null, userName)
	}

	function handleRatingChange(value) {
		form.fields.rating.change(null, value)
	}

	const submit = async function() {
		const defaultMessage = {
			success: 'Thank you. Your feedback will be published after moderation',
			error: 'Error'
		}
		let okCount = 0, message = ''

		await UserService.sendFeedback(form.fields.userName.value, form.fields.rating.value, form.fields.text.value)
			.then(() => {
				okCount++
				form.fields.userName.clear()
				form.fields.text.clear()
			})
			.catch(() => {
				throw new Error()
			})

		if (okCount) message = defaultMessage.success

		return message
	}
	
	const form = useForm({
		action: submit,
		fields: [
			{name: 'userName', required: true},
			{name: 'text', required: true},
			{name: 'rating', type: 'rating', required: true},
		]
	})
	console.log(form);

	return (
		<TranslateHandler>
			<form className={classes.form} action="#" onSubmit={form.submit}>
				<Container className={classes.container}>
					{form.isPending && <Loader className={classes.loader} />}
					<div className={classes.title}>?_Rate us!</div>
					<div className={classes.ratingWrapper}>
						<Rating
							className={classes.rating}
							onChange={handleRatingChange}
						/>
						<div className={classes.ratingMessage}>
							{!form.fields.rating.isValid && form.fields.rating.message}
						</div>
					</div>
					<InputText
						className={`${classes.inputText} ${form.fields.userName.isValid ? '' : classes.error}`}
						value={form.fields.userName.value}
						onChange={form.fields.userName.change}
						placeholder='?_Your name'
					/>
					<p className={classes.userNameSetter} onClick={setNameAsAccountName}>
						<span>?_or use your account name</span>
						<span className='bold'> "{userName}"</span>
					</p>
					<textarea
						className={`${classes.textarea} ${form.fields.text.isValid ? '' : classes.error}`}
						value={form.fields.text.value}
						onChange={form.fields.text.change}
						placeholder='?_Your feedback'
					></textarea>

					<p className={`${classes.formMessage} ${form.isError ? classes.error : ''}`}>?_{form.message}</p>
					<Button className={classes.button}>?_Send</Button>
				</Container>
			</form>
		</TranslateHandler>
	)
})

export default FeedbackForm
