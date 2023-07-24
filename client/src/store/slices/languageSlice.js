import { createSlice } from '@reduxjs/toolkit';

const LANGUAGE = 'language'

const initialState = {
	name: LANGUAGE,
	default: 'en',
	current: 'en',
	list: [ 'en', 'ru', 'de' ]
}
let storageValue = localStorage.getItem(LANGUAGE)
if (initialState.list.includes(storageValue)) initialState.current = storageValue
else localStorage.setItem(LANGUAGE, initialState.default)


export const languageSlice = createSlice({
	name: LANGUAGE,
	initialState,
	reducers: {
		changeLanguage(state, action) {
			let newValue = action.payload.toLowerCase()
			if (initialState.list.includes(newValue)) {
				state.current = newValue
				localStorage.setItem(LANGUAGE, newValue)
			}
		}
	}
})

export const {changeLanguage} = languageSlice.actions
export default languageSlice.reducer
