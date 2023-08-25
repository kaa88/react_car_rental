import {getDefaultControllers} from './defaultController.js'
import user from './userController.js'
import reservation from './reservationController.js'
import cars from './carsController.js'

const defaultControllerNames = [
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
	{cars},
)

export default mainController