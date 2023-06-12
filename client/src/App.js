import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { initScripts } from './script/index'
import './styles/index.scss';
import Header from './components/parts/Header/Header';
import Main from './components/parts/Main/Main';
import Footer from './components/parts/Footer/Footer';
// import Modal from './components/parts/Modal/Modal';


function App() {
	const dispatch = useDispatch()
	useEffect(() => { initScripts(dispatch) }, [])

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