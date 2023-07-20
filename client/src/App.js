import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { initOnloadScripts, initInstantScripts } from './utilities/initScripts'
import './scss/index.scss';
import Router from './router';
import WindowEvents from './components/WindowEvents';
import AuthChecker from './components/AuthChecker';


function App() {
	const dispatch = useDispatch()
	initInstantScripts(dispatch)
	useEffect(() => { initOnloadScripts(dispatch) }, [])

	return (
		<>
			<Router />
			<WindowEvents />
			<AuthChecker />
		</>
	)
}

export default App