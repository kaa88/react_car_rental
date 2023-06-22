import { getCookie } from '../../../script/cookie'

export const Language = {
	name: 'language',
	default: 'en',
	current: 'en',
	list: [ 'en', 'ru', 'de' ]
}
let currentLang = getCookie()[Language.name]
if (currentLang) Language.current = currentLang
