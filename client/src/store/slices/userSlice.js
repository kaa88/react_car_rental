import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	id: '',
	email: '',
	role: '',
	name: '',
	image: '',
	cookieAccepted: false,
	isActivated: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		changeUserData(state, action) {
			let payload = action.payload === null ? initialState : action.payload
			let newState = Object.assign({}, state, payload)
			state.id = newState.id
			state.email = newState.email
			state.role = newState.role
			state.name = (newState.name && newState.name !== 'null') ? newState.name : newState.email
			state.image = newState.image
			state.cookieAccepted = newState.cookieAccepted
			state.isActivated = newState.isActivated
		},
	}
})

export const {changeUserData} = userSlice.actions
export default userSlice.reducer
