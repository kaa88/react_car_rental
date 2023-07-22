import { createSlice } from '@reduxjs/toolkit';
import { Language } from '../../components/ui/OptionsSelect/language'

const LANGUAGE = 'language'

export const languageSlice = createSlice({
	name: LANGUAGE,
	initialState: Language,
	reducers: {
		changeLanguage(state, action) {
			state.current = action.payload
			localStorage.setItem(LANGUAGE, action.payload)
		}
	}
})

export const {changeLanguage} = languageSlice.actions
export default languageSlice.reducer
