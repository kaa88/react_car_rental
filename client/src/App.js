import './styles/index.scss';
import Header from './components/parts/Header/Header';
import Main from './components/parts/Main/Main';
import Footer from './components/parts/Footer/Footer';
// import Modal from './components/parts/Modal/Modal';

import { register } from 'swiper/element/bundle'
register() // register Swiper custom elements


function App() {

	return (
		<>
			<Header />
			<Main />
			<Footer />
			{/* Modal */}
		</>
	)
}

export default App