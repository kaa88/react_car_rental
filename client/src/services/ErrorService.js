const UNKNOWN_ERR_MESSAGE = 'Unknown error'
const ERR_TYPE_AXIOS = 'AxiosError'

export function handleError(error) {
	console.error(error)
	let errorMessage = error.message
	if (error.name && error.name === ERR_TYPE_AXIOS) {
		if (error.response && error.response.status !== 404) errorMessage = error.response.data.message
	}
	if (!errorMessage) errorMessage = UNKNOWN_ERR_MESSAGE
	return {
		error: errorMessage,
		ok: false,
		data: null
	}
}
