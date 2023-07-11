import { getCookie } from '../../../services/cookie'

export const Language = {
	name: 'language',
	default: 'en',
	current: 'en',
	list: [ 'en', 'ru', 'de' ]
}
let currentLang = getCookie()[Language.name]
if (currentLang) Language.current = currentLang
