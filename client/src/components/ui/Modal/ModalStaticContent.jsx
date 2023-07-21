import { memo } from 'react';
import LoginForm from '../../parts/Forms/AccountForm/LoginForm';
import RegisterForm from '../../parts/Forms/AccountForm/RegisterForm';
import RestorePasswordForm from '../../parts/Forms/AccountForm/RestorePasswordForm';
import UserLoggedInAlert from '../../parts/Alerts/UserLoggedInAlert/UserLoggedInAlert';

export const names = {
	login: 'login',
	register: 'register',
	restore_password: 'restore_password',
	user_logged_in: 'user_logged_in',
}

const ModalStaticContent = memo(function ModalStaticContent({ name = '' }) {

	function getContent(name) {
		switch(name) {
			case 'login':
				return <LoginForm />
			case 'register':
				return <RegisterForm />
			case 'restore_password':
				return <RestorePasswordForm />
			case 'user_logged_in':
				return <UserLoggedInAlert />
			default: return ''
		}
	}

	return getContent(name)
})



export default ModalStaticContent
