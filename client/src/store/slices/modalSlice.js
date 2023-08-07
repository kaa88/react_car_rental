import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
	name: 'modal',
	initialState: {
		active: '',
		content: ''
	},
	reducers: {
		setActiveModal(state, action) {
			if (!action.payload) state.active = ''
			if (typeof action.payload === 'string') state.active = action.payload
			if (typeof action.payload === 'object' && !Array.isArray(action.payload)) {
				state.active = action.payload.name || ''
				if (action.payload.content) state.content = action.payload.content
			}
		},
	}
})

export const {setActiveModal} = modalSlice.actions
export default modalSlice.reducer
