import Utils from "./utilities";
// import axios from 'axios'

// add fake data

async function fetchData(request) {
	if (!request || typeof request !== 'object') return null
	const { path='', method='GET', body={} } = request
	const entry = process.env.REACT_APP_API_URL
	let reqQuery = ''
	if (method === 'GET' && body && !Utils.object.isEmpty(body)) reqQuery = `?${new URLSearchParams(body).toString()}`
	const fullPath = entry + path + reqQuery
	
	const headers = {
		'Content-Type': 'application/json;charset=utf-8'
	}

	const controller = new AbortController()
	let abortTimeout = setTimeout(() => {
		controller.abort()
		console.error(`"${path}" fetch has been aborted due to timeout`)
		return result
	}, process.env.REACT_APP_FETCH_TIMEOUT)

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

// const recentServerRequests = {}

async function prepareToFetch(request, processInfo) {
	console.log('fetch');
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
export default prepareToFetch