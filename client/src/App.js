import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { initOnloadScripts, initInstantScripts } from './script/index'
import './styles/index.scss';
import Header from './components/parts/Header/Header';
import Main from './components/parts/Main/Main';
import Footer from './components/parts/Footer/Footer';
import Modal from './components/ui/Modal/Modal';


function App() {
	const dispatch = useDispatch()
	initInstantScripts(dispatch)
	useEffect(() => { initOnloadScripts(dispatch) }, [])

	return (
		<>
			<Header />
			<Main />
			<Footer />
			<Modal />
		</>
	)
}

export default App