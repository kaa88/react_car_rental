import {getDefaultControllers} from './defaultController.js'
import user from './userController.js'
import feedback from './feedbackController.js'

const defaultControllerNames = [
	'cars',
	'carParams',
	'carOptions',
	'reservation',
	'currency',
]
const defaultControllers = getDefaultControllers(defaultControllerNames)

const mainController = Object.assign(
	{},
	defaultControllers,
	{user},
	{feedback},
)

export default mainController