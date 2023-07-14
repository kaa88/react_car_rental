import {getDefaultControllers} from './defaultController.js'
import user from './userController.js'

const defaultControllerNames = [
	'car',
	'carParams',
	'reservation',
	'feedback',
	'currency',
]
const defaultControllers = getDefaultControllers(defaultControllerNames)

const mainController = Object.assign(
	{},
	defaultControllers,
	{user}
)

export default mainController