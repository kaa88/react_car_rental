import { DataTypes } from 'sequelize'
import sequelize from '../db.js'

export const user = sequelize.define('user', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	email: {type: DataTypes.STRING, allowNull: false, unique: true},
	password: {type: DataTypes.STRING, allowNull: false},
	role: {type: DataTypes.STRING, defaultValue: 'USER'}, // USER ADMIN
	accessToken: {type: DataTypes.STRING, unique: true},
	refreshToken: {type: DataTypes.STRING, unique: true},
	image: {type: DataTypes.STRING},
	language: {type: DataTypes.STRING},
})

export const cars = sequelize.define('car', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, allowNull: false},
	price: {type: DataTypes.INTEGER, allowNull: false},
	params: {type: DataTypes.JSON},
	additionalParams: {type: DataTypes.JSON},
})

export const carParams = sequelize.define('car_params', {
	id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, unique: true},
	name: {type: DataTypes.STRING, allowNull: false, unique: true}
})

export const carOptions = sequelize.define('car_options', {
	id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, unique: true},
	name: {type: DataTypes.STRING, allowNull: false, unique: true}
})

export const reservation = sequelize.define('reservation', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	pickupDate: {type: DataTypes.DATE, allowNull: false},
	returnDate: {type: DataTypes.DATE, allowNull: false},
	place: {type: DataTypes.STRING, allowNull: false},
	price: {type: DataTypes.INTEGER, allowNull: false}
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

user.hasOne(currency)

cars.hasMany(reservation)
reservation.belongsTo(cars)


export default {
	user,
	cars,
	carParams,
	carOptions,
	reservation,
	feedback,
	currency,
}