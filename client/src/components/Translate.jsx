import React, {useState} from 'react';
import translate from './script/translate'

function Translate({children, ...props}) {
	let processInfo = [
		'Translate',
		children.replace(/ /g, '').substring(0,20)
	]

	const defaultFetchData = ' '
	let [fetchData, setFetchData] = useState(defaultFetchData)

	async function getTranslate() {
		let str = await translate(processInfo, children)
		setFetchData(str)
	}
	if (fetchData === defaultFetchData) getTranslate()

	return fetchData
}

export default Translate