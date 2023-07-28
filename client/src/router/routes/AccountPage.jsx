import Header from '../../components/parts/Header/Header';
import Account from '../../components/parts/Account/Account';
import Footer from '../../components/parts/Footer/Footer';
import Modal from '../../components/ui/Modal/Modal';
import PageTitle from '../PageTitle';
import UserSession from '../../components/UserSession';
import { useSelector } from 'react-redux';

function AccountPage() {

	const userID = useSelector(state => state.user.id)

	function checkAuth(isAuth) {
		if (!isAuth) console.log('USER IS NOT LOGGED IN');
		else console.log('AUTH IS OK');
	}

	return (
		<>
			<UserSession onLoad={checkAuth} />
			<PageTitle value='Account' />
			<Header />
			<Account />
			<Footer />
			<Modal />
		</>
	)
}

export default AccountPage