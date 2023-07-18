import { useState } from "react"
import FetchService from "../services/fetch"

export async function useFetching() {
	const defaultState = {
		isLoading: false,
		response: '',
		error: ''
	}
	let [state, setState] = useState(defaultState)
	const response = await FetchService.getCars()
	return response
}
