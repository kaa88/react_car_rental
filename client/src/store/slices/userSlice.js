import { createSlice } from '@reduxjs/toolkit';
import UserService from '../../services/UserService';

const defaultState = {
	id: '',
	email: '',
	role: '',
	name: '',
	image: '',
	cookieAccepted: false,
	isActivated: false,
}

let initialState = await UserService.getUserDataOnInit() || defaultState

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		changeUserData(state, action) {
			let payload = action.payload === null ? defaultState : action.payload
			let newState = Object.assign({}, state, payload)
			state.id = newState.id
			state.email = newState.email
			state.role = newState.role
			state.name = newState.name || newState.email
			state.image = newState.image
			state.cookieAccepted = newState.cookieAccepted
			state.isActivated = newState.isActivated
		},
	}
})

export const {changeUserData} = userSlice.actions
export default userSlice.reducer
