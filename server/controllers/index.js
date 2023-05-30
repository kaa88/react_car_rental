import {getDefaultControllers} from './defaultController.js'
import user from './userController.js'
import language from './langController.js'

const defaults = [
	'car',
	'carprops',
	'currency',
	'feedback',
	'regexp',
	'reservation'
]
const defaultControllers = getDefaultControllers(defaults)

const mainController = Object.assign(
	defaultControllers,
	{language},
	{user}
)

export default mainController