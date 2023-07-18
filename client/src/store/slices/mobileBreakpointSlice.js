import { createSlice } from '@reduxjs/toolkit';

export const mobileBreakpointSlice = createSlice({
	name: 'mobileBreakpoint',
	initialState: {
		tablet: 0,
		mobile: 0
	},
	reducers: {
		changeMobileBreakpoint(state, action) {
			state.tablet = action.payload.tablet
			state.mobile = action.payload.mobile
		}
	}
})

export const {changeMobileBreakpoint} = mobileBreakpointSlice.actions
export default mobileBreakpointSlice.reducer
