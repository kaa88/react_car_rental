async function fetchData(request) {
	if (!request || typeof request !== 'object') return null
	const {path, method, body} = request
	if (!path || !method || !body) return null
	const entry = 'http://localhost:5000/api/'
	const reqQuery = method === 'GET'
		? `?${new URLSearchParams(body).toString()}`
		: ''
	const fullPath = entry + path + reqQuery
	
	const headers = {
		'Content-Type': 'application/json;charset=utf-8'
	}

	const controller = new AbortController()
	let abortTimeout = setTimeout(() => {
		controller.abort()
		console.error(`Fetch "${path}" aborted due to timeout`)
		return result
	}, 2000)

	const fetchParams = {
		method,
		headers,
		signal: controller.signal
	}
	if (method !== 'GET') fetchParams.body = JSON.stringify(body)

	let result = null


	await fetch( fullPath, fetchParams )
	.then(response => {
		clearTimeout(abortTimeout)
		if (response.ok) return response.json()
	})
	.then(data => {
		if (data) result = data
	})
	.catch(error => {
		console.error(error)
	})
	return result
}

const recentServerRequests = {}

export default async function({processInfo, request}) {
	// This func blocks recurring server requests e.g. when React trying to rerender many times.
	// let caller, process, delay = 1000;
	// caller = recentServerRequests[processInfo[0]]
	// if (caller) process = caller[processInfo[1]]

	// let time = Date.now() - process
	// if (time < delay) return null

	// recentServerRequests[processInfo[0]] = {}
	// recentServerRequests[processInfo[0]][processInfo[1]] = Date.now()

	let data = await fetchData(request)
	return data
}