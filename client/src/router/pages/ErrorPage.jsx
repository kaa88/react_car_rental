import { Link } from 'react-router-dom';
import Header from '../../components/parts/Header/Header';
import Modal from '../../components/ui/Modal/Modal';
import Container from '../../components/ui/Container/Container';
import TranslateHandler from '../../components/TranslateHandler';
import PageTitle from '../PageTitle';
import Main from '../../components/parts/Main/Main';

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
			<PageTitle value='Page Not Found' />
			<Header />
			<Main>
				<TranslateHandler>
					<Container style={styles.container}>
						<p style={styles.title}>404</p>
						<p style={styles.subtitle}>?_Page Not Found</p>
						<Link to='/' style={styles.link}>?_Go to Homepage</Link>
					</Container>
				</TranslateHandler>
			</Main>
			<Modal />
		</>
	)
}

export default ErrorPage