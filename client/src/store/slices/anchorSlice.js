import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	anchors: {},
	active: ''
}

export const anchorSlice = createSlice({
	name: 'anchor',
	initialState,
	reducers: {
		setAnchorPosition(state, action) {
			let name = action.payload.name
			let position = action.payload.position || 0
			if (name) state.anchors[name] = position
		},
		clearAnchorPosition(state, action) {
			let name = action.payload
			if (name) state.anchors[name] = null
		},
		setActiveAnchor(state, action) {
			const threshold = 5
			let y = window.scrollY + threshold
			let activePos = 0
			let activeName = ''
			Object.entries(state.anchors).forEach(([key, value]) => {
				if (value < y && value >= activePos) {
					activePos = value
					activeName = key
				}
			})
			state.active = activeName
		},
	}
})

export const {setAnchorPosition, clearAnchorPosition, setActiveAnchor} = anchorSlice.actions
export default anchorSlice.reducer
