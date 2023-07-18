import {getDefaultControllers} from './defaultController.js'
import user from './userController.js'

const defaultControllerNames = [
	'cars',
	'carParams',
	'carOptions',
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