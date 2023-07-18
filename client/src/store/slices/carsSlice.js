import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const carsSlice = createSlice({
	name: 'cars',
	initialState: {
		cars: [],
		isLoading: false,
		error: ''
	},
	reducers: {
		carsFetching(state) {
			state.isLoading = true
		},
		carsFetchingSuccess(state, action) {
			state.isLoading = false
			state.error = ''
			state.cars = action.payload
		},
		carsFetchingError(state, action) {
			state.isLoading = false
			state.error = action.payload
		},
	}
})

export const {carsFetching, carsFetchingSuccess, carsFetchingError} = carsSlice.actions
export default carsSlice.reducer


// export const fetchCars = async function(dispatch) {
// 	try {
// 		dispatch(carsSlice.actions.carsFetching())
// 		const response = await axios.get('/cars')
// 		dispatch(carsSlice.actions.carsFetchingSuccess(response.data))
// 	}
// 	catch (err) {
// 		dispatch(carsSlice.actions.carsFetchingError(err.message))
// 	}
// }
