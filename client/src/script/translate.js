import { cloneElement, isValidElement } from 'react'
import { getCookie, setCookie } from './cookie'
import lang_en from '../language/en.json'
import lang_ru from '../language/ru.json'
import lang_de from '../language/de.json'

const deps = {
	en: lang_en,
	ru: lang_ru,
	de: lang_de
}
Object.entries(deps).forEach((lang) => {
	let checkId = []
	let duplicates = {}
	lang[1].forEach((item) => {
		if (checkId[item.id]) duplicates[item.id] = true
		else checkId[item.id] = true
	})
	let keys = Object.keys(duplicates)
	if (keys.length) console.warn(`Duplicates of "id" [${keys}] have been found in "${lang[0]}" language package. It may cause errors with translation.`)
})

const cookieExpireDays = 30
const isCookieLog = true

export const Language = {
	name: 'language',
	default: 'en',
	current: 'en',
	list: [ 'en', 'ru', 'de' ],
	setCookie(value) {
		if (value) {
			setCookie({
				name: this.name,
				value: value.toLowerCase(),
				expires: cookieExpireDays,
			}, isCookieLog )
		}
	}
}
let currentLang = getCookie()[Language.name]
if (currentLang) Language.current = currentLang


export function Translate({children}){
	const regexp = /^\?_/

	function scan(elem, index = 0) {
		if (Array.isArray(elem)) {
			return elem.map((item, i) => scan(item, i))
		}

		else if (typeof elem === 'object') {
			if (!isValidElement(elem) || !elem.props) return elem
			let newProps = {key: index}
			Object.entries(elem.props).forEach((item) => {
				if (typeof item[1] === 'object') newProps[item[0]] = scan(item[1])
				else if (typeof item[1] === 'string') newProps[item[0]] = translate(item[1])
				else newProps[item[0]] = item[1]
			})
			let {children, ...props} = newProps
			return cloneElement(elem, props, children)
		}

		else if (typeof elem === 'string') {
			return translate(elem)
		}

		else return elem
	}

	function translate(str) {
		if (!str || typeof str !== 'string' || !regexp.test(str)) return str
		str = str.replace(regexp, '')
		if (Language.current === Language.default) return str
		if (!isNaN(Number(str))) return str
		
		let match = deps[Language.default].find(item => item.text.toLocaleLowerCase() === str.toLocaleLowerCase())
		if (match) {
			let translate = deps[Language.current].find(item => item.id === match.id)
			if (translate) return translate.text
		}
	
		let shortStr, shortStrLength = 30;
		if (str.length > shortStrLength) shortStr = str.substring(0, shortStrLength) + '...'
		console.warn(`Missing "${Language.current}" translate for "${shortStr ? shortStr : str}"`)
		return str
	}

	return scan(children)
}