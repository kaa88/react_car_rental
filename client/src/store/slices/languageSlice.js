import { createSlice } from '@reduxjs/toolkit';
import { Language } from '../../components/ui/OptionsSelect/language'

export const languageSlice = createSlice({
	name: 'language',
	initialState: Language,
	reducers: {
		changeLanguage(state, action) {
			state.current = action.payload
		}
	}
})

export const {changeLanguage} = languageSlice.actions
export default languageSlice.reducer
