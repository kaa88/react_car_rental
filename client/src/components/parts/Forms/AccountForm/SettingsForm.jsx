import { memo, useState } from 'react';
import classes from './AccountForm.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import Button from '../../../ui/Button/Button';
import ModalLink from '../../../ui/Modal/ModalLink'
import InputText from '../../../ui/InputText/InputText';
import InputPassword from '../../../ui/InputPassword/InputPassword';
import Container from '../../../ui/Container/Container';
import UserService from '../../../../services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserData } from '../../../../store/slices/userSlice';
import { setActiveModal, setModalContent } from '../../../../store/slices/modalSlice';
import UserPhoto from '../../../ui/UserPhoto/UserPhoto';
import Loader from '../../../ui/Loader/Loader';
import { useCustomElement } from '../../../../hooks/useCustomElement';
import { useFormField } from '../../../../hooks/useFormField';

const IMAGE_DIR = process.env.REACT_APP_USER_PHOTOS_DIR
const ERROR_REQUIRED = 'required'
const ERROR_INCORRECT = 'incorrect'

const SettingsForm = memo(function SettingsForm() {

	const dispatch = useDispatch()
	const userData = useSelector(state => state.user)
	const userID = userData ? userData.id : ''
	const userName = userData ? userData.name : ''
	const userPhoto = userData ? userData.image : ''


	const newUserNameInput = useFormField({type: 'text'})
	const newCurrentPasswordInput = useFormField({type: 'password', required: true})
	const newNewPasswordInput = useFormField({type: 'password', required: true})
	const fields = [
		newUserNameInput,
		newCurrentPasswordInput,
		newNewPasswordInput,
	]
	let [pending, setPending] = useState(false)
	let [errorMessage, setErrorMessage] = useState('')

	const handleSubmit = async function(e) {
		e.preventDefault()
		let errors = []
		fields.forEach(field => {
			let errorType = field.validate()
			if (errorType) errors.push(errorType)
		})

		if (errors.length === 1) {
			if (errors[0] === ERROR_REQUIRED) return setErrorMessage('Please fill in required fields')
			if (errors[0] === ERROR_INCORRECT) return setErrorMessage('Please enter correct values')
		}
		if (errors.length > 1) return setErrorMessage('Please fill in the fields with correct values')

		setPending(true)
		let nameChangeResponse, pwdChangeResponse
		if (newUserNameInput.value) nameChangeResponse = await UserService.edit(userID, newUserNameInput.value)
		if (newNewPasswordInput.value) pwdChangeResponse = await changePassword() // WHERE?? userId, currentPassword, newPassword
		if (nameChangeResponse.ok && pwdChangeResponse.ok) {
			setErrorMessage('')
		}
		else if (pwdChangeResponse.error) setErrorMessage(pwdChangeResponse.error.message)
		setPending(false)
	}





	// const defaultInputState = {
	// 	isValid: true,
	// 	value: '',
	// 	errorClass: ''
	// }
	// let [newUserName, setNewUserName] = useState(defaultInputState)
	// let [currentPassword, setCurrentPassword] = useState(defaultInputState)
	// let [newPassword, setNewPassword] = useState(defaultInputState)

	// const changeUserName = (value) => setNewUserName({...value, errorClass: ''})
	// const changeCurrentPassword = (value) => setCurrentPassword({...value, errorClass: ''})
	// const changeNewPassword = (value) => setNewPassword({...value, errorClass: ''})



	// const checkFields = function() {
	// 	const errorClass = classes.error
	// 	let errors = 0
	// 	if (!newUserName.isValid) {
	// 		setNewUserName({...newUserName, errorClass})
	// 		errors++
	// 	}
	// 	if (!currentPassword.isValid) {
	// 		setCurrentPassword({...currentPassword, errorClass})
	// 		errors++
	// 	}
	// 	if (!newPassword.isValid) {
	// 		setNewPassword({...newPassword, errorClass})
	// 		errors++
	// 	}
	// 	return errors
	// }

	// const handleSubmit = async function(e) {
	// 	e.preventDefault()
	// 	let errors = checkFields()
	// 	if (errors) return setErrorMessage('Required or incorrect values')

	// 	setPending(true)
	// 	let nameChangeResponse, pwdChangeResponse
	// 	if (newUserName) nameChangeResponse = await UserService.edit(userID, newUserName)
	// 	if (newPassword) pwdChangeResponse = await changePassword()
	// 	if (nameChangeResponse.ok && pwdChangeResponse.ok) {
	// 		setErrorMessage('')
	// 	}
	// 	else if (pwdChangeResponse.error) setErrorMessage(pwdChangeResponse.error.message)
	// 	setPending(false)
	// }

	const changePassword = async function() {
		if (!currentPassword || !newPassword) return setErrorMessage('Incorrect values')
		return await UserService.changePassword(userID, currentPassword, newPassword)
	}

	return (
		<TranslateHandler>
			{/* <Form className={classes.settingsForm} onSubmit={handleSubmit}> */}
			<form className={`${classes.settingsForm}`} action="#" onSubmit={handleSubmit}>
				{pending && <Loader className={classes.loader} />}
				<div className={classes.settingsInputs}>
					<p className={classes.sectionTitle}>
						<span>?_Name</span><span className='bold'>: {userName}</span>
					</p>
					<InputText
						className={classes.inputText}
						onChange={changeUserName}
						placeholder='?_Change name'
					/>
					<p className={classes.sectionTitle}>?_Change password</p>
					<InputPassword
						className={`${classes.inputPassword} ${currentPassword.errorClass}`}
						onChange={changeCurrentPassword}
						validation={false}
						required={true}
						placeholder='?_Current password'
					/>
					<InputPassword
						className={`${classes.inputPassword} ${newPassword.errorClass}`}
						onChange={changeNewPassword}
						required={true}
						placeholder='?_New password'
					/>
				</div>
				<div className={classes.settingsPhoto}>
					<UserPhoto src={IMAGE_DIR + '/' + userPhoto} />
					<Button className={`${classes.button} ${classes.settingsPhotoBtn}`} modif='negative'>
						<span>+ </span>
						<span>
							{userPhoto ? '?_Change photo' : '?_Add photo'}
						</span>
					</Button>
				</div>
				<div className={classes.settingsSubmit}>
					<Button className={`${classes.button} ${classes.settingsSubmitBtn}`}>?_Save changes</Button>
					<p className={classes.errorMessage}>Error message {errorMessage}</p>
				</div>
			</form>
			{/* </Form> */}
		</TranslateHandler>
	)
})

export default SettingsForm