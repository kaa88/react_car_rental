import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		isAuth: false
	},
	reducers: {
		changeAuthState(state, action) {
			state.isAuth = action.payload
		}
	}
})

export const {changeAuthState} = userSlice.actions
export default userSlice.reducer
