import { useState } from "react"

export function useFetching(callback) {
	let [isLoading, setIsLoading] = useState(false)
	let [error, setError] = useState(false)

	async function fetchData() {
		try {
			setIsLoading(true)
			await callback()
		}
		catch(err) {
			setError(true)
		}
		finally {
			setIsLoading(false)
		}
	}

	return [fetchData, isLoading, error]
}
