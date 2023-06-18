import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { initOnloadScripts, initInstantScripts, initEventScripts } from './script/index'
import './styles/index.scss';
import Header from './components/parts/Header/Header';
import Main from './components/parts/Main/Main';
import Footer from './components/parts/Footer/Footer';
// import Modal from './components/parts/Modal/Modal';


function App() {
	const dispatch = useDispatch()
	const headerMetrics = useSelector(state => state.headerMetrics)
	initInstantScripts(dispatch, headerMetrics)
	useEffect(() => { initOnloadScripts(dispatch) }, [])

	function getHeader(header, headerParams) {
		// initEventScripts(header, headerParams)
	}

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