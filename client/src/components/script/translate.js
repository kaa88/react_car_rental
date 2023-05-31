async function getTranslation(str) {
	if (str === '' || typeof str != 'string') return str

	const PATH = 'http://localhost:5000/api/language'
	const headers = {
		'Content-Type': 'application/json;charset=utf-8'
	}
	const body = {
		text: str,
		currentLang: "lang_en",
		translateTo: "lang_ru"
	}
	let result = str

	const controller = new AbortController()
	let abortTimeout = setTimeout(() => {
		controller.abort()
		console.error('Fetch aborted due to timeout')
		return result
	}, 2000)

	await fetch( PATH, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(body),
		signal: controller.signal
	})
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

export default async function(processInfo, req) {
	// This func blocks recurring server requests e.g. when React trying to rerender many times.
	let caller, process, delay = 1000;
	caller = recentServerRequests[processInfo[0]]
	if (caller) process = caller[processInfo[1]]

	let time = Date.now() - process
	if (time < delay) return null

	recentServerRequests[processInfo[0]] = {}
	recentServerRequests[processInfo[0]][processInfo[1]] = Date.now()

	let fetchedData = await getTranslation(req)
	return fetchedData
}