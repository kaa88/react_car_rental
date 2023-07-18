import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
	name: 'modal',
	initialState: {
		activeModal: null,
		content: ''
	},
	reducers: {
		setActiveModal(state, action) {
			state.activeModal = action.payload
		},
		setModalContent(state, action) {
			state.content = action.payload
		},
	}
})

export const {setActiveModal, setModalContent} = modalSlice.actions
export default modalSlice.reducer
