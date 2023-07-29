import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../../../hooks/useForm';
import classes from './AccountForm.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import Button from '../../../ui/Button/Button';
import InputText from '../../../ui/InputText/InputText';
import InputPassword from '../../../ui/InputPassword/InputPassword';
import UserService from '../../../../services/UserService';
import UserPhoto from '../../../ui/UserPhoto/UserPhoto';
import Loader from '../../../ui/Loader/Loader';
import InputFile from '../../../ui/InputFile/InputFile';
import Icon from '../../../ui/Icon/Icon';

const IMAGE_DIR = process.env.REACT_APP_USER_PHOTOS_DIR


const SettingsForm = memo(function SettingsForm() {

	const userData = useSelector(state => state.user)
	const userName = userData ? userData.name : ''
	const userPhoto = userData ? userData.image : ''

	const submit = async function() {
		const defaultMessage = {
			success: 'Changes are saved',
			error: 'Error'
		}
		let okCount = 0, errors = [], message = ''

		if (form.fields.currentPassword.value && form.fields.newPassword.value) {
			let {ok, error} = await UserService.changePassword(form.fields.currentPassword.value, form.fields.newPassword.value)
			if (ok) {
				okCount++
				form.fields.currentPassword.clear()
				form.fields.newPassword.clear()
			}
			else {
				if (error.match(/invalid/)) form.fields.currentPassword.setError()
				if (error.match(/weak/)) form.fields.newPassword.setError()
				throw new Error(error)
			}
		}

		if (form.fields.userName.value) {
			let {ok, error} = await UserService.edit('name', form.fields.userName.value)
			if (ok) {
				okCount++
				form.fields.userName.clear()
			}
			else {
				form.fields.userName.setError(error)
				throw new Error(error)
			}
		}

		if (form.fields.image.value.file) {
			let {ok, error} = await UserService.changeImage(form.fields.image.value.file)
			if (ok) {
				okCount++
				form.fields.image.clear()
			}
			else {
				form.fields.image.setError(error)
				throw new Error(error)
			}
		}

		if (errors.length) {
			if (errors.length === 1) message = errors[0]
			else message = [].concat(defaultMessage.error, errors).join('. ')
		}
		else if (okCount) {
			message = defaultMessage.success
			await UserService.getUserData()
		}
		else form.clear()

		return message
	}

	const preValidatePasswords = function() {
		const ERROR_INCORRECT = 'incorrect'
		let message = ''
		if (form.fields.newPassword.value) {
			form.fields.newPassword.validate()
			if (!form.fields.currentPassword.value) {
				form.fields.currentPassword.setError(ERROR_INCORRECT)
				message = 'Please enter current password'
			}
			if (form.fields.newPassword.value === form.fields.currentPassword.value) {
				form.fields.currentPassword.setError(ERROR_INCORRECT)
				form.fields.newPassword.setError(ERROR_INCORRECT)
				message = 'Please enter different passwords'
			}
		}
		if (message) {
			return {message}
		} else return {ok: true}
	}
	
	const form = useForm({
		customValidation: preValidatePasswords,
		action: submit,
		fields: [
			{name: 'userName'},
			{name: 'currentPassword', type: 'password', validate: false},
			{name: 'newPassword', type: 'password'},
			{name: 'image', type: 'file', defaultValue: {file: '', blob: ''}},
		]
	})

	function changePhoto(photo = {}, errorMessage) {
		if (errorMessage) {
			console.error(errorMessage)
			form.fields.image.clear()
			form.setError(errorMessage)
		}
		else {
			form.fields.image.change(false, photo)
			form.removeError()
		}
	}

	return (
		<TranslateHandler>
			<form className={classes.settingsForm} action="#" onSubmit={form.submit}>
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
					<InputPassword
						className={`${classes.inputPassword} ${form.fields.newPassword.isValid ? '' : classes.error}`}
						value={form.fields.newPassword.value}
						onChange={form.fields.newPassword.change}
						placeholder='?_New password'
					/>
				</div>
				<div className={classes.settingsPhoto}>
					<div className={classes.settingsPhotoBox}>
						<UserPhoto src={form.fields.image.value.blob || `${IMAGE_DIR}/${userPhoto}`} />
						{!!form.fields.image.value.file &&
							<div className={classes.settingsPhotoClearBtn} onClick={form.fields.image.clear()} title='?_Clear'>
								<Icon name='icon-cross' />
							</div>
						}
					</div>
					<InputFile
						className={classes.inputFile}
						onChange={changePhoto}
					>
						<Button type='button' className={`${classes.button} ${classes.settingsPhotoBtn}`} modif='negative'>
							<span>+ </span>
							<span>
								?_{userPhoto ? 'Change photo' : 'Add photo'}
							</span>
						</Button>
					</InputFile>
				</div>
				<div className={classes.settingsSubmit}>
					<Button className={`${classes.button} ${classes.settingsSubmitBtn}`}>?_Save changes</Button>
					<p className={`${classes.formMessage} ${form.isError ? classes.error : ''}`}>?_{form.message}</p>
				</div>
			</form>
		</TranslateHandler>
	)
})

export default SettingsForm