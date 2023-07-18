import { createSlice } from '@reduxjs/toolkit';

export const popupSlice = createSlice({
	name: 'popup',
	initialState: {
		active: ''
	},
	reducers: {
		setActivePopup(state, action) {
			state.active = action.payload
		}
	}
})

export const {setActivePopup} = popupSlice.actions
export default popupSlice.reducer
