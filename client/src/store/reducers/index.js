import { combineReducers } from 'redux'
import currencyReducer from './currencyReducer'
import languageReducer from './languageReducer'
import mobileBreakpointReducer from './mobileBreakpointReducer'
import formPopupReducer from './formPopupReducer'

export const rootReducer = combineReducers({
	currency: currencyReducer,
	language: languageReducer,
	mobileBreakpoint: mobileBreakpointReducer,
	formPopup: formPopupReducer,
})