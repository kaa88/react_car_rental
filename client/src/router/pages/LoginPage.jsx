import LiteLayout from '../layouts/LiteLayout';
import LoginForm from '../../components/parts/Forms/AccountForm/LoginForm';

function LoginPage() {

	return (
		<LiteLayout pageTitle='Sign in'>
			<LoginForm />
		</LiteLayout>
	)
}

export default LoginPage