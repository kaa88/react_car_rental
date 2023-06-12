import { scrollLock } from './scrollLock'
import { changeMobileBreakpoint } from '../store/reducers/mobileBreakpointReducer'

import { register } from 'swiper/element/bundle'
register() // register Swiper custom elements


const mobileBreakpointVariable = '--media-mobile'

export function initScripts(dispatch) {
	let mobileBreakpoint = parseFloat(getComputedStyle(document.body).getPropertyValue(mobileBreakpointVariable)) || 782;
	dispatch(changeMobileBreakpoint(mobileBreakpoint))

	scrollLock.init()
}
