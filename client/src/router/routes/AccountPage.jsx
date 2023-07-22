import Header from '../../components/parts/Header/Header';
import Account from '../../components/parts/Account/Account';
import Footer from '../../components/parts/Footer/Footer';
import Modal from '../../components/ui/Modal/Modal';
import PageTitle from '../PageTitle';
import UserSession from '../../components/UserSession';

function AccountPage() {
	return (
		<>
			<UserSession />
			<PageTitle value='Account' />
			<Header />
			<Account />
			<Footer />
			<Modal />
		</>
	)
}

export default AccountPage