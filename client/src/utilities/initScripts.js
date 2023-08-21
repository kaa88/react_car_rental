import { scrollLock } from './scrollLock'
import { jsMediaQueries } from './jsMediaQueries'
import { scriptManager } from './scriptManager'
import { changeMobileBreakpoint } from '../store/slices/mobileBreakpointSlice'
import UserService from '../services/UserService'
import { register } from 'swiper/element/bundle'
import { setActiveSelect } from '../store/slices/selectSlice'
import { setActivePopup } from '../store/slices/popupSlice'

export function initInstantScripts(dispatch) {
	initUserService(dispatch)
	initBreakpoints(dispatch)
	register() // Swiper custom elements
	scriptManager.init({
		// testMode: true
	})
	jsMediaQueries.init({
		// testMode: true
	})
	turnOffLoader()
}

export function initOnloadScripts(dispatch) {
	initWindowEvents(dispatch)
	scrollLock.init()
}


function initBreakpoints(dispatch) {
	const mobileBPVariable = '--media-mobile'
	const tabletBPVariable = '--media-tablet'
	const state = {
		mobile: parseFloat(getComputedStyle(document.body).getPropertyValue(mobileBPVariable)) || 0,
		tablet: parseFloat(getComputedStyle(document.body).getPropertyValue(tabletBPVariable)) || 0
	}
	dispatch(changeMobileBreakpoint(state))
}

function initWindowEvents(dispatch) {
	window.addEventListener('click', () => dispatch(setActiveSelect('')))
	window.addEventListener('click', () => dispatch(setActivePopup('')))
}

function initUserService(dispatch) {
	UserService.dispatch = dispatch
}

function turnOffLoader() {
	let loader = document.getElementById('loader')
	if (loader) loader.style.display = 'none'
}