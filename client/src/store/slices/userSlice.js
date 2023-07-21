import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		isAuth: false,
		id: '',
		email: '',
		role: '',
		image: '',
	},
	reducers: {
		changeUserData(state, action) {
			let newState = Object.assign({}, state, action.payload)
			console.log(newState);
			state.isAuth = newState.isAuth
			state.id = newState.id
			state.email = newState.email
			state.role = newState.role
			state.image = newState.image
		},
	}
})

export const {changeUserData} = userSlice.actions
export default userSlice.reducer
