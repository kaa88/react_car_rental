import { cloneElement, isValidElement } from 'react'
import { useSelector } from 'react-redux'
import lang_en from '../language/en.json'
import lang_ru from '../language/ru.json'
import lang_de from '../language/de.json'

const languages = {
	en: lang_en,
	ru: lang_ru,
	de: lang_de
}

const MATCHING_SYMBOLS = /^\?_/

// TranslateHandler scans closest children of a component. If it finds strings with leading symbols '?_', it will translate them.
// Alternatively sometimes it is reasonable to use the "translate" func separately. Don't forget to pass "language" argument to it.
function TranslateHandler({children}){
	const Language = useSelector(state => state.language)

	function scan(elem, index = 0) {
		if (Array.isArray(elem)) {
			return elem.map((item, i) => scan(item, i))
		}

		else if (typeof elem === 'object') {
			if (!isValidElement(elem) || !elem.props) return elem
			let newProps = {key: index}
			Object.entries(elem.props).forEach(([key, value]) => {
				if (typeof value === 'object') newProps[key] = scan(value)
				else if (typeof value === 'string') newProps[key] = translate(value, Language)
				else newProps[key] = value
			})
			let {children, ...props} = newProps
			return cloneElement(elem, props, children)
		}

		else if (typeof elem === 'string') {
			return translate(elem, Language)
		}

		else return elem
	}

	return scan(children)
}

export default TranslateHandler

export function translate(str, language) {
	if (!str || typeof str !== 'string' || !str.match(MATCHING_SYMBOLS)) return str
	str = str.replace(MATCHING_SYMBOLS, '')
	if (language.current === language.default) return str
	if (!isNaN(Number(str))) return str
	
	let match = Object.entries(languages[language.default]).find(([key, value]) => value.toLocaleLowerCase() === str.toLocaleLowerCase())
	if (match) {
		let translation = languages[language.current][match[0]]
		return translation ? translation : ''
	}
	// else
	let shortStr, shortStrLength = 30;
	if (str.length > shortStrLength) shortStr = str.substring(0, shortStrLength) + '...'
	console.info(`WARN! Missing "${language.current}" translate for "${shortStr ? shortStr : str}"`)
	return str
}
