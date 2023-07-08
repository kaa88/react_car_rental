import { combineReducers } from 'redux'
import currencyReducer from './currencyReducer'
import languageReducer from './languageReducer'
import mobileBreakpointReducer from './mobileBreakpointReducer'
import formPopupReducer from './formPopupReducer'
import formDataReducer from './formDataReducer'
import modalReducer from './modalReducer'
import selectReducer from './selectReducer'

export const rootReducer = combineReducers({
	currency: currencyReducer,
	language: languageReducer,
	mobileBreakpoint: mobileBreakpointReducer,
	formPopup: formPopupReducer,
	formData: formDataReducer,
	modal: modalReducer,
	select: selectReducer,
})