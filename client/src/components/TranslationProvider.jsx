import React, {useState, Children} from 'react';
import translate from './script/translate'


function TranslationProvider({children, ...props}) {
	const regexp = /^\_\$/


	function lookForTranslate(obj) {
		let arr = []
		if (Array.isArray(obj)) arr = obj
		else if (obj.props) arr = Object.values(obj.props)
		else return
		arr.map((item) => {
			if (typeof item === 'object') lookForTranslate(item)
			if (typeof item === 'string' && regexp.test(item)) {
				item = item.replace(regexp, '')
				console.log(item);
			}
		})
		return obj
	}
	
	let result = lookForTranslate(children)
	// console.log(result);

	return (
		<>{result}</>
	)
}

export default TranslationProvider