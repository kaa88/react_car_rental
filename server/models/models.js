import { DataTypes } from 'sequelize'
import sequelize from '../db.js'

const User = sequelize.define('user', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	email: {type: DataTypes.STRING, unique: true},
	login: {type: DataTypes.STRING, unique: true},
	password: {type: DataTypes.STRING},
	role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Car = sequelize.define('car', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING},
	engine: {type: DataTypes.STRING},
	transmission: {type: DataTypes.STRING},
	passengers: {type: DataTypes.INTEGER},
	bags: {type: DataTypes.INTEGER},
	doors: {type: DataTypes.INTEGER},
	info: {type: DataTypes.TEXT}
})

const CarProps = sequelize.define('car_props', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, allowNull: false}
})

const Reservation = sequelize.define('reservation', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	dateFrom: {type: DataTypes.STRING, allowNull: false},
	dateTill: {type: DataTypes.STRING, allowNull: false},
	time: {type: DataTypes.STRING, allowNull: false},
	place: {type: DataTypes.STRING, allowNull: false},
	price: {type: DataTypes.FLOAT(2), allowNull: false}
})

const Feedback = sequelize.define('feedback', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	img: {type: DataTypes.STRING},
	rating: {type: DataTypes.INTEGER, defaultValue: 5},
	text: {type: DataTypes.TEXT, allowNull: false},
	author: {type: DataTypes.STRING, allowNull: false}
})

const Currency = sequelize.define('currency', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, allowNull: false},
	rate: {type: DataTypes.FLOAT, allowNull: false}
})

const Language = sequelize.define('language', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	locale: {type: DataTypes.STRING, allowNull: false}
})

User.hasMany(Reservation)
Reservation.belongsTo(User)

Reservation.hasOne(Car)
Car.belongsTo(Reservation)

CarProps.hasMany(Car)
Car.belongsTo(CarProps)

export default {
	User,
	Car,
	CarProps,
	Reservation,
	Feedback,
	Currency,
	Language
}