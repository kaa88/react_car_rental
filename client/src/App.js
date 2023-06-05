import './css/App.css';
import { Provider } from 'react-redux'
import store from './store/index'
import Header from './components/Header';
import Banner from './components/Banner';
import Cars from './components/Cars';
import Faq from './components/Faq';
import Feedback from './components/Feedback';
import Footer from './components/Footer';

function App() {

	return (
		<Provider store={store}>
			<Header />
			<Banner />
			<Cars />
			<Faq />
			<Feedback />
			<Footer />
		</Provider>
	);
}

export default App
