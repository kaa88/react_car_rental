import { combineReducers } from 'redux'
import currencyReducer from './currencyReducer'
import languageReducer from './languageReducer'
import headerReducer from './headerReducer'
import mobileBreakpointReducer from './mobileBreakpointReducer'

export const rootReducer = combineReducers({
	currency: currencyReducer,
	language: languageReducer,
	headerMetrics: headerReducer,
	mobileBreakpoint: mobileBreakpointReducer,
})