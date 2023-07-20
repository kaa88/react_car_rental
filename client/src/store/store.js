import { combineReducers, configureStore } from '@reduxjs/toolkit'
import currency from './slices/currencySlice'
import language from './slices/languageSlice'
import mobileBreakpoint from './slices/mobileBreakpointSlice'
import popup from './slices/popupSlice'
import reservationForm from './slices/reservationFormSlice'
import modal from './slices/modalSlice'
import select from './slices/selectSlice'
import header from './slices/headerSlice'
import user from './slices/userSlice'

const rootReducer = combineReducers({
	currency,
	language,
	mobileBreakpoint,
	reservationForm,
	header,
	modal,
	select,
	popup,
	user,
})

export default configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})
