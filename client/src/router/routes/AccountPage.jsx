import Header from '../../components/parts/Header/Header';
import Main from '../../components/parts/Main/Main';
import Footer from '../../components/parts/Footer/Footer';
import Modal from '../../components/ui/Modal/Modal';
import PageTitle from '../PageTitle';

function AccountPage() {
	return (
		<>
			<PageTitle value='Account' />
			<Header />
			<Footer />
			<Modal />
		</>
	)
}

export default AccountPage