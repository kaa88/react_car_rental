// import { getCookie } from '../../../services/cookie'

export const Language = {
	name: 'language',
	default: 'en',
	current: 'en',
	list: [ 'en', 'ru', 'de' ]
}
let currentLang = localStorage.getItem(Language.name)
if (currentLang && currentLang !== 'null') Language.current = currentLang
