import {getDefaultControllers} from './defaultController.js'
import user from './userController.js'
import reservation from './reservationController.js'

const defaultControllerNames = [
	'cars',
	'carParams',
	'carOptions',
	'currency',
	'feedback'
]
const defaultControllers = getDefaultControllers(defaultControllerNames)

const mainController = Object.assign(
	{},
	defaultControllers,
	{user},
	{reservation},
)

export default mainController