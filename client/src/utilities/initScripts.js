import { scrollLock } from './scrollLock'
import { jsMediaQueries } from './jsMediaQueries'
import { scriptManager } from './scriptManager'
import { changeMobileBreakpoint } from '../store/slices/mobileBreakpointSlice'

import { register } from 'swiper/element/bundle'
register() // register Swiper custom elements

// TODO: window events module

function initBreakpoints(dispatch) {
	const mobileBPVariable = '--media-mobile'
	const tabletBPVariable = '--media-tablet'
	const state = {
		mobile: parseFloat(getComputedStyle(document.body).getPropertyValue(mobileBPVariable)) || 0,
		tablet: parseFloat(getComputedStyle(document.body).getPropertyValue(tabletBPVariable)) || 0
	}
	dispatch(changeMobileBreakpoint(state))
}


export function initInstantScripts(dispatch) {
	initBreakpoints(dispatch)
	scriptManager.init({
		// testMode: true
	})
	jsMediaQueries.init({
		// testMode: true
	})
}
export function initOnloadScripts(dispatch) {
	scrollLock.init()
}
