import { cloneElement, Children } from 'react'
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


export default function ({children}){
	const regexp = /^\?_/

	function clone(children) {
		return Children.map(children, (child) => {
			let newChildren;
			if (child.props.children && typeof child.props.children === 'object') newChildren = clone(child.props.children)
			let newParams = getNewParams(child)
			let newProps = Object.keys(newParams.props).length ? newParams.props : null
			if (newParams.children) newChildren = newParams.children
			return cloneElement( child, newProps, newChildren )
		})
	}

	function getNewParams(elem) {
		let props = {}
		let children = null
		Object.entries(elem.props).forEach((prop) => {
			if (typeof prop[1] === 'string') {
				if (prop[0] === 'children') children = translate(prop[1])
				else props[prop[0]] = translate(prop[1])
			}
		})
		return {props, children}
	}

	function translate(str) {
		if (str === '' || typeof str !== 'string' || !regexp.test(str)) return str
		str = str.replace(regexp, '')
		if (Language.current === Language.default) return str
		
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

	return clone(children)
}