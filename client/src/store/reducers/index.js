import { combineReducers } from 'redux'
import currencyReducer from './currencyReducer'
import languageReducer from './languageReducer'
import headerMetricsReducer from './headerMetricsReducer'
import mobileBreakpointReducer from './mobileBreakpointReducer'

export const rootReducer = combineReducers({
	currency: currencyReducer,
	language: languageReducer,
	headerMetrics: headerMetricsReducer,
	mobileBreakpoint: mobileBreakpointReducer,
})