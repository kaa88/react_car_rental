import { scrollLock } from './scrollLock'
import { jsMediaQueries } from './jsMediaQueries'
import { changeMobileBreakpoint } from '../store/reducers/mobileBreakpointReducer'

import { register } from 'swiper/element/bundle'
register() // register Swiper custom elements


function initBreakpoints(dispatch) {
	const mobileBreakpointVariable = '--media-mobile'
	const tabletBreakpointVariable = '--media-tablet'
	let mobileBreakpoint = {
		mobile: parseFloat(getComputedStyle(document.body).getPropertyValue(mobileBreakpointVariable)) || 0,
		tablet: parseFloat(getComputedStyle(document.body).getPropertyValue(tabletBreakpointVariable)) || 0
	}
	dispatch(changeMobileBreakpoint(mobileBreakpoint))
}


export function initInstantScripts(dispatch) {
	initBreakpoints(dispatch)
	jsMediaQueries.init({
		// testMode: true
	})
}
export function initOnloadScripts(dispatch) {
	scrollLock.init()
}
