import { useState } from "react"

export function useFetching(callback) {
	let [isLoading, setIsLoading] = useState(false)
	let [error, setError] = useState('')

	async function fetchData() {
		try {
			setIsLoading(true)
			await callback()
		}
		catch(err) {
			setError(err.message)
		}
		finally {
			setIsLoading(false)
		}
	}

	return [fetchData, isLoading, error]
}
