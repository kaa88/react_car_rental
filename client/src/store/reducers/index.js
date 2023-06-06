import { combineReducers } from 'redux'
import currencyReducer from './currencyReducer'
import languageReducer from './languageReducer'

export const rootReducer = combineReducers({
	currency: currencyReducer,
	language: languageReducer,
})