import { memo, useState } from 'react';
import classes from './AccountForm.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import Button from '../../../ui/Button/Button';
import InputText from '../../../ui/InputText/InputText';
import InputPassword from '../../../ui/InputPassword/InputPassword';
import Container from '../../../ui/Container/Container';
import UserService from '../../../../services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserData } from '../../../../store/slices/userSlice';
import UserPhoto from '../../../ui/UserPhoto/UserPhoto';
import Loader from '../../../ui/Loader/Loader';
import { useForm } from '../../../../hooks/useForm';

const IMAGE_DIR = process.env.REACT_APP_USER_PHOTOS_DIR


const SettingsForm = memo(function SettingsForm() {

	const dispatch = useDispatch()
	const userData = useSelector(state => state.user)
	const userID = userData ? userData.id : ''
	const userName = userData ? userData.name : ''
	const userPhoto = userData ? userData.image : ''

	const submit = async function() {
		const defaultMessage = {
			success: 'OK',
			error: 'Error'
		}
		let okCount = 0, errors = [], message = ''
		let nameChangeResponse, pwdChangeResponse

		if (form.fields.userName.value) {
			nameChangeResponse = await UserService.edit(userID, 'name', form.fields.userName.value)
			console.log(form.fields.userName.value);
			console.log(nameChangeResponse);
			if (nameChangeResponse.ok) okCount++
			else errors.push(nameChangeResponse.error)
		}
		if (form.fields.newPassword.value) {
			if (!form.fields.currentPassword.value) {
				form.fields.currentPassword.setError()
				return message = 'Please enter current password'
			}
			pwdChangeResponse = await UserService.changePassword(userID, form.fields.currentPassword.value, form.fields.newPassword.value)
			console.log(pwdChangeResponse);
			if (pwdChangeResponse.ok) okCount++
			else errors.push(pwdChangeResponse.error)
		}

		console.log(okCount);
		console.log(errors);
		if (errors.length) {
			if (errors.length === 1) message = errors[0]
			else {
				errors.forEach(err => console.error(err))
				message = defaultMessage.error
			}
		}
		else if (okCount) message = defaultMessage.success
		else form.clear()

		return message
	}
	
	const form = useForm({
		action: submit,
		fields: [
			{name: 'userName'},
			{name: 'currentPassword', type: 'password', validate: false},
			{name: 'newPassword', type: 'password'},
		]
	})
	console.log(form);
	console.log(form.fields.newPassword.value);

	return (
		<TranslateHandler>
			<form className={`${classes.settingsForm}`} action="#" onSubmit={form.submit}>
				{form.isPending && <Loader className={classes.loader} />}
				<div className={classes.settingsInputs}>
					<p className={classes.sectionTitle}>
						<span>?_Name</span><span className='bold'>: {userName}</span>
					</p>
					<InputText
						className={classes.inputText}
						value={form.fields.userName.value}
						onChange={form.fields.userName.change}
						placeholder='?_Change name'
					/>
					<p className={classes.sectionTitle}>?_Change password</p>
					<InputPassword
						className={`${classes.inputPassword} ${form.fields.currentPassword.isValid ? '' : classes.error}`}
						value={form.fields.currentPassword.value}
						onChange={form.fields.currentPassword.change}
						placeholder='?_Current password'
					/>
					<p>{form.fields.currentPassword.isValid ? '' : form.fields.currentPassword.message}</p>
					<InputPassword
						className={`${classes.inputPassword} ${form.fields.newPassword.isValid ? '' : classes.error}`}
						value={form.fields.newPassword.value}
						onChange={form.fields.newPassword.change}
						placeholder='?_New password'
					/>
					<p>{form.fields.newPassword.isValid ? '' : form.fields.newPassword.message}</p>
				</div>
				<div className={classes.settingsPhoto}>
					<UserPhoto src={IMAGE_DIR + '/' + userPhoto} />
					<Button type='button' className={`${classes.button} ${classes.settingsPhotoBtn}`} modif='negative'>
						<span>+ </span>
						<span>
							{userPhoto ? '?_Change photo' : '?_Add photo'}
						</span>
					</Button>
				</div>
				<div className={classes.settingsSubmit}>
					<Button className={`${classes.button} ${classes.settingsSubmitBtn}`}>?_Save changes</Button>
					<p className={classes.errorMessage}>Error message {form.message}</p>
				</div>
				<Button type='button' onClick={form.clear}>CLEAR</Button>
			</form>
		</TranslateHandler>
	)
})

export default SettingsForm