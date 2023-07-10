import { combineReducers } from 'redux'
import currencyReducer from './currencyReducer'
import languageReducer from './languageReducer'
import mobileBreakpointReducer from './mobileBreakpointReducer'
import popupReducer from './popupReducer'
import reservationFormReducer from './reservationFormReducer'
import modalReducer from './modalReducer'
import selectReducer from './selectReducer'
import headerReducer from './headerReducer'

export const rootReducer = combineReducers({
	currency: currencyReducer,
	language: languageReducer,
	mobileBreakpoint: mobileBreakpointReducer,
	reservationForm: reservationFormReducer,
	header: headerReducer,
	modal: modalReducer,
	select: selectReducer,
	popup: popupReducer,
})