import { createSlice } from '@reduxjs/toolkit';

export const carParamsSlice = createSlice({
	name: 'carParams',
	initialState: {
		carParams: [],
		carOptions: [],
		isLoading: false,
		error: ''
	},
	reducers: {
		carParamsFetching(state) {
			state.isLoading = true
		},
		carParamsFetchingSuccess(state, action) {
			state.isLoading = false
			state.error = ''
			state.carParams = action.payload
		},
		carParamsFetchingError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},
	}
})

export const {carParamsFetching, carParamsFetchingSuccess, carParamsFetchingError} = carParamsSlice.actions
export default carParamsSlice.reducer

// export const fetchCarParams = async function(dispatch) {
// 	try {
// 		dispatch(carsSlice.actions.carsFetching())
// 		const response = await axios.get('/cars')
// 		dispatch(carsSlice.actions.carsFetchingSuccess(response.data))
// 	}
// 	catch (err) {
// 		dispatch(carsSlice.actions.carsFetchingError(err.message))
// 	}
// }
