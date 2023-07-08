import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { initOnloadScripts, initInstantScripts } from './script/index'
import './styles/index.scss';
import Router from './router/index';
import WindowEvents from './components/WindowEvents';


function App() {
	const dispatch = useDispatch()
	initInstantScripts(dispatch)
	useEffect(() => { initOnloadScripts(dispatch) }, [])

	return (
		<>
			<Router />
			<WindowEvents />
		</>
	)
}

export default App