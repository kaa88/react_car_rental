import { DataTypes } from 'sequelize'
import sequelize from '../db.js'

export const user = sequelize.define('user', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	email: {type: DataTypes.STRING, allowNull: false, unique: true},
	password: {type: DataTypes.STRING, allowNull: false},
	role: {type: DataTypes.STRING, defaultValue: 'USER'}, // USER, ADMIN, GUEST
	name: {type: DataTypes.STRING},
	image: {type: DataTypes.STRING},
	language: {type: DataTypes.STRING},
	currency: {type: DataTypes.STRING},
	cookieAccepted: {type: DataTypes.BOOLEAN, defaultValue: false},
	isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
})

export const cars = sequelize.define('car', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, allowNull: false},
	shortName: {type: DataTypes.STRING, allowNull: false},
	price: {type: DataTypes.INTEGER, allowNull: false},
	params: {type: DataTypes.JSON},
	options: {type: DataTypes.JSON},
})

export const carParams = sequelize.define('car_params', {
	id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, unique: true},
	name: {type: DataTypes.STRING, allowNull: false, unique: true},
	abbr: {type: DataTypes.STRING, unique: true},
})

export const carOptions = sequelize.define('car_options', {
	id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, unique: true},
	name: {type: DataTypes.STRING, allowNull: false, unique: true},
	abbr: {type: DataTypes.STRING, unique: true},
})

export const reservation = sequelize.define('reservation', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	pickupDate: {type: DataTypes.DATE, allowNull: false},
	returnDate: {type: DataTypes.DATE, allowNull: false},
	location: {type: DataTypes.STRING, allowNull: false},
	price: {type: DataTypes.INTEGER, allowNull: false},
	isInactive: {type: DataTypes.BOOLEAN, defaultValue: false},
	sameLocationReturn: {type: DataTypes.BOOLEAN, defaultValue: true}
})

export const feedback = sequelize.define('feedback', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	image: {type: DataTypes.STRING},
	rating: {type: DataTypes.INTEGER, defaultValue: 5},
	text: {type: DataTypes.TEXT, allowNull: false},
	author: {type: DataTypes.STRING, allowNull: false}
})

export const currency = sequelize.define('currency', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, allowNull: false, unique: true},
	rate: {type: DataTypes.FLOAT, allowNull: false}
})

user.hasMany(reservation) // means user.getReservations()
reservation.belongsTo(user) // means reservation.getUser()

cars.hasMany(reservation)
reservation.belongsTo(cars)


const models = {
	user,
	cars,
	carParams,
	carOptions,
	reservation,
	feedback,
	currency,
}
export default models