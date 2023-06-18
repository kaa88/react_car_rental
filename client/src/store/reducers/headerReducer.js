const defaultState = {
	headerEl: '',
	headerParams: {}
}

const CHANGE_HEADER = 'CHANGE_HEADER'

export default function headerReducer(state = defaultState, action) {
	switch(action.type) {
		case CHANGE_HEADER:
			return action.payload
		default:
			return state
	}
}

export function changeHeaderMetricsData(value) {
	return {
		type: CHANGE_HEADER,
		payload: value
	}
}
// const defaultState = {
// 	headerHeight: 0,
// 	headerPosition: 0,
// 	headerOffset: 0,
// 	windowHeight: 0,
// }

// const CHANGE_METRICS = 'CHANGE_METRICS'

// export default function headerReducer(state = defaultState, action) {
// 	switch(action.type) {
// 		case CHANGE_METRICS:
// 			return action.payload
// 		default:
// 			return state
// 	}
// }

// export function changeMetrics(value) {
// 	return {
// 		type: CHANGE_METRICS,
// 		payload: value
// 	}
// }
