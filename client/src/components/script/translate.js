export default async function(str) {
	if (str === '' || typeof str != 'string') return str

	const PATH = 'http://localhost:5000/api/language'

	let body = {
		text: str,
		currentLang: "lang_en",
		translateTo: "lang_ru"
	}

	let response = await fetch( PATH, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(body)
	})
	
	if (response.ok) {
		let text = await response.json()
		return text
	}
	else return str
}