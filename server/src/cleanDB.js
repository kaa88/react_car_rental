import 'dotenv/config'
import { Op } from 'sequelize'
import sequelize from './db.js'
import models from './models/models.js'
import FileService from './services/FileService.js'


const GUEST = 'GUEST'
const USER = 'USER'
const ADMIN = 'ADMIN'

const loginMaxDays = {
	[GUEST]: 2,
	[USER]: 5,
}

async function cleanUsers() {
	let guests = await getOutdatedUsers(GUEST)
	let users = await getOutdatedUsers(USER)
	let deleteList = [null].concat(guests, users)

	await models.reservation.destroy({
		where: {
			userId: {
				[Op.or]: deleteList
			}
		}
	})
	await models.user.destroy({
		where: {
			id: {
				[Op.or]: deleteList
			}
		}
	})
}
async function getOutdatedUsers(role) {
	if (!role) return []
	const threshold = Date.now() - (loginMaxDays[role] * 24 * 60 * 60 * 1000)
	let deleteList = []
	let users = await models.user.findAll({where: {role}})
	users.forEach(user => {
		let lastLoggedIn = user.lastLoggedIn ? user.lastLoggedIn.getTime() : 0
		if (lastLoggedIn < threshold) {
			deleteList.push(user.id)
			cleanUserPhoto(user.image)
		}
	})
	return deleteList
}

function cleanUserPhoto(filename) {
	if (filename) FileService.deleteUserPhoto(filename)
}



async function start() {
	try {
		await sequelize.authenticate()
			.then(() => {
				console.log('MySQL authentication is OK')
				console.log('DataBase cleaning script is in progress...')
				cleanUsers()
			})
	} catch (err) {
		console.log(err)
	}
}
start()
