import Header from '../../components/parts/Header/Header';
import Footer from '../../components/parts/Footer/Footer';
import Modal from '../../components/ui/Modal/Modal';
import Container from '../../components/ui/Container/Container';
import TranslateHandler from '../../components/TranslateHandler';
import { Link } from 'react-router-dom';
import PageTitle from '../PageTitle';

function ErrorPage() {

	const styles = {
		container: {
			paddingTop: '50px',
			paddingBottom: '50px',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		},
		title: {
			fontFamily: 'var(--font02)',
			fontSize: '76px',
		},
		subtitle: {
			fontSize: '20px',
		},
		link: {
			marginTop: '30px',
			textDecoration: 'underline',
			color: 'var(--color03)'
		},
	}

	return (
		<>
			<PageTitle value='404 - Not Found' />
			<Header />
			<TranslateHandler>
				<Container style={styles.container}>
					<p style={styles.title}>404</p>
					<p style={styles.subtitle}>?_Page Not Found</p>
					<Link to='/' style={styles.link}>?_Go to Homepage</Link>
				</Container>
			</TranslateHandler>
			<Modal />
		</>
	)
}

export default ErrorPage