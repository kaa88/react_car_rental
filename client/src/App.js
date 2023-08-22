import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { initOnloadScripts, initInstantScripts } from './utilities/initScripts'
import './scss/index.scss';
import Router from './router/Router';


function App() {
	const dispatch = useDispatch()
	initInstantScripts(dispatch)
	useEffect(() => {
		initOnloadScripts(dispatch)
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Router />
	)
}

export default App