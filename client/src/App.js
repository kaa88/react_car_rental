import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { initOnloadScripts, initInstantScripts } from './utilities/initScripts'
import './scss/index.scss';
import Router from './router/Router';
import WindowEvents from './components/WindowEvents';
import UserSession from './components/UserSession';


function App() {
	const dispatch = useDispatch()
	initInstantScripts(dispatch)
	useEffect(() => { initOnloadScripts(dispatch) }, [])

	return (
		<>
			<Router />
			<WindowEvents />
			<UserSession />
		</>
	)
}

export default App