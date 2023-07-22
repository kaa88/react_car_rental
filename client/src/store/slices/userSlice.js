import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	id: '',
	email: '',
	role: '',
	image: '',
	cookieAccepted: false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		changeUserData(state, action) {
			let payload = action.payload === null ? initialState : action.payload
			let newState = Object.assign({}, state, payload)
			console.log(newState); //
			// state.isAuth = newState.isAuth
			state.id = newState.id
			state.email = newState.email
			state.role = newState.role
			state.image = newState.image
			state.cookieAccepted = newState.cookieAccepted
		},
	}
})

export const {changeUserData} = userSlice.actions
export default userSlice.reducer
