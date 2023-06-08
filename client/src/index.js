import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/index'
import App from './App'


const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(
	<Provider store={store}>
		<App />
	</Provider>
)