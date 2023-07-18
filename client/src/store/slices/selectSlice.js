import { createSlice } from '@reduxjs/toolkit';

export const selectSlice = createSlice({
	name: 'select',
	initialState: {
		active: ''
	},
	reducers: {
		setActiveSelect(state, action) {
			state.active = action.payload
		}
	}
})

export const {setActiveSelect} = selectSlice.actions
export default selectSlice.reducer
