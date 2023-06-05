import { Currency } from '../../components/script/currency';

const defaultState = Currency

const CHANGE_CURRENCY = 'CHANGE_CURRENCY'

export default function currencyReducer(state = defaultState, action) {
	switch(action.type) {
		case CHANGE_CURRENCY:
			return {...state, current: action.payload}
		default:
			return state
	}
}

export function changeCurrency(value) {
	return {
		type: CHANGE_CURRENCY,
		payload: value
	}
}