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
import Form from '../Form';

const IMAGE_DIR = process.env.REACT_APP_USER_PHOTOS_DIR


const SettingsForm = memo(function SettingsForm() {

	const dispatch = useDispatch()
	const userData = useSelector(state => state.user)
	const userID = userData ? userData.id : ''
	const userName = userData ? userData.name : ''
	const userPhoto = userData ? userData.image : ''


	let [newUserName, setNewUserName] = useState('')
	let [currentPassword, setCurrentPassword] = useState('')
	let [newPassword, setNewPassword] = useState('')
	let [error, setError] = useState('')

	const handleUserNameChange = (e) => setNewUserName(e.target.value)
	const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value)
	const handleNewPasswordChange = (e) => setNewPassword(e.target.value)

	const handleSubmit = async function(e) {
		// e.preventDefault()
		// let nameChangeResponse, pwdChangeResponse
		// if (newUserName) nameChangeResponse = await UserService.edit(userID, newUserName)
		// if (newPassword) pwdChangeResponse = await changePassword()
		// if (nameChangeResponse.ok && pwdChangeResponse.ok) {
		// 	setError('')
		// }
		// else setError(pwdChangeResponse.error.message)
	}

	const changePassword = async function() {
		if (!currentPassword || !newPassword) return setError('Incorrect values')
		return await UserService.changePassword(userID, currentPassword, newPassword)
	}

	return (
		<TranslateHandler>
			<Form className={classes.settingsForm} onSubmit={handleSubmit}>
			{/* <form className={classes.settingsForm} action="#" onSubmit={handleSubmit}> */}
				<div className={classes.settingsInputs}>
					<p className={classes.sectionTitle}>
						<span>?_Name</span><span className='bold'>: {userName}</span>
					</p>
					<InputText
						className={classes.inputText}
						name='name'
						placeholder='?_Change name'
						value={newUserName}
						onChange={handleUserNameChange}
						required
					/>
					<p className={classes.sectionTitle}>?_Change password</p>
					<InputPassword
						className={classes.inputPassword}
						name='current_password'
						placeholder='?_Current password'
						value={currentPassword}
						onChange={handleCurrentPasswordChange}
					/>
					<InputPassword
						className={classes.inputPassword}
						name='password'
						placeholder='?_New password'
						value={newPassword}
						onChange={handleNewPasswordChange}
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
					<p className={classes.error}>Error message {error}</p>
				</div>
			{/* </form> */}
			</Form>
		</TranslateHandler>
	)
})

export default SettingsForm