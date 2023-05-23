import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/reset.css';
import './css/global.css';
import App from './App';

// import and register Swiper custom elements
import { register } from 'swiper/element/bundle';
register();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<App />
);
