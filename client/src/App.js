import { useSelector } from 'react-redux'
import './css/reset.css';
import './css/global.css';
import './css/App.css';
import Header from './components/parts/Header/Header';
import Banner from './components/parts/Banner/Banner';
import Cars from './components/parts/Cars/Cars';
import Faq from './components/parts/Faq/Faq';
import Feedback from './components/parts/Feedback/Feedback';
import Footer from './components/parts/Footer/Footer';

import { register } from 'swiper/element/bundle'
register() // register Swiper custom elements


function App() {

	const language = useSelector(state => state.language.current)

	// рендер происходит, но не обновляет язык

	return (
		<>
			<Header />
			<main className={`main lang-${language}`}>
				<Banner />
				<Cars />
				<Faq />
				<Feedback />
			</main>
			<Footer />
		</>
	)
}

export default App