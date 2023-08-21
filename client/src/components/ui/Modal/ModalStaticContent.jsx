import { memo } from 'react';
import LoginForm from '../../parts/Forms/AccountForm/LoginForm';
import RegisterForm from '../../parts/Forms/AccountForm/RegisterForm';
import RestorePasswordForm from '../../parts/Forms/AccountForm/RestorePasswordForm';
import UserLoggedInAlert from '../../parts/Alerts/UserLoggedInAlert/UserLoggedInAlert';
import FeedbackForm from '../../parts/Forms/FeedbackForm/FeedbackForm';
import RestorePasswordAlert from '../../parts/Alerts/RestorePasswordAlert/RestorePasswordAlert';

export const staticNames = {
	login: 'login',
	register: 'register',
	restore_password: 'restore_password',
	user_logged_in: 'user_logged_in',
	restore_password_alert: 'restore_password_alert',
}

const MODAL = 'modal'

const ModalStaticContent = memo(function ModalStaticContent({ name = '' }) {

	function getContent(name) {
		switch(name) {
			case 'login':
				return <LoginForm modif={MODAL} />
			case 'register':
				return <RegisterForm modif={MODAL} />
			case 'restore_password':
				return <RestorePasswordForm modif={MODAL} />
			case 'new_feedback':
				return <FeedbackForm />
			case 'user_logged_in':
				return <UserLoggedInAlert />
			case 'restore_password_alert':
				return <RestorePasswordAlert />
			default: return ''
		}
	}

	return getContent(name)
})



export default ModalStaticContent
