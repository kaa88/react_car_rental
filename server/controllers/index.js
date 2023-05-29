import getDefaultControllers from './defaultController.js'
import user from './userController.js'

const defaults = [
	'car',
	'carprops',
	'currency',
	'feedback',
	'language',
	'reservation'
]
const defaultControllers = getDefaultControllers(defaults)

const mainController = Object.assign(
	defaultControllers,
	user
)

export default mainController