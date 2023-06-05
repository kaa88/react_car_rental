import lang_en from '../../data/language/en.json'
import lang_ru from '../../data/language/ru.json'
import lang_de from '../../data/language/de.json'
import { getCookie, setCookie } from './cookie.js'

function setLang(lang) {
	if (lang) {
		this.current = lang
		setCookie({
			name: this.name,
			value: lang.toLowerCase(),
			expires: 30,
		}, true )
	}
}

export const Language = {
	name: 'language',
	default: 'en',
	current: 'en',
	list: [ 'en', 'ru', 'de' ],
	set: setLang
}
let currentLang = getCookie()[Language.name]
if (currentLang) Language.current = currentLang

export default function (str){
	if (str === '' || typeof str !== 'string') return str
	if (Language.current === Language.default) return str

	const deps = {
		en: lang_en,
		ru: lang_ru,
		de: lang_de
	}

	let match = deps[Language.default].find(item => item.text.toLocaleLowerCase() == str.toLocaleLowerCase())
	if (match) {
		let translate = deps[Language.current].find(item => item.id == match.id)
		if (translate) return translate.text
	}

	let shortStr, shortStrLength = 30;
	if (str.length > shortStrLength) shortStr = str.substring(0, shortStrLength) + '...'
	console.warn(`Missing "${Language.current}" translate for "${shortStr ? shortStr : str}"`)
	return str
}