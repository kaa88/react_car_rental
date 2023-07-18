import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
	name: 'header',
	initialState: {
		headerIsInitialized: false,
		headerIsFixed: false,
		headerIsCompact: false,
		headerIsSharing: false,
	
		menuIsInitialized: false,
		menuIsActive: false,
		// menuIsShrinked: false,
	},
	reducers: {
		setHeaderInitialized(state, action) {
			state.headerIsInitialized = action.payload
		},
		setHeaderFixed(state, action) {
			state.headerIsFixed = action.payload
		},
		setHeaderCompact(state, action) {
			state.headerIsCompact = action.payload
		},
		setHeaderSharing(state, action) {
			state.headerIsSharing = action.payload
		},
		setMenuInitialized(state, action) {
			state.menuIsInitialized = action.payload
		},
		setMenuActive(state, action) {
			state.menuIsActive = action.payload
		},
	}
})

export const {
	setHeaderInitialized,
	setHeaderFixed,
	setHeaderCompact,
	setHeaderSharing,
	setMenuInitialized,
	setMenuActive
} = headerSlice.actions

export default headerSlice.reducer
