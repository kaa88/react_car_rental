import { memo } from 'react';
import SigninForm from '../../parts/Forms/AccountForm/SigninForm';
import RegisterForm from '../../parts/Forms/AccountForm/RegisterForm';
import RestorePasswordForm from '../../parts/Forms/AccountForm/RestorePasswordForm';


const ModalStaticContent = memo(function ModalStaticContent({ name = '' }) {

	function getContent(name) {
		switch(name) {
			case 'signin':
				return <SigninForm />
			case 'register':
				return <RegisterForm />
			case 'restore_password':
				return <RestorePasswordForm />
			default: return ''
		}
	}

	return getContent(name)
})

export default ModalStaticContent
