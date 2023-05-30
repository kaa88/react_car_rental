import { DataTypes } from 'sequelize'
import sequelize from '../db.js'

const user = sequelize.define('user', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	email: {type: DataTypes.STRING, allowNull: false, unique: true},
	password: {type: DataTypes.STRING, allowNull: false},
	role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const car = sequelize.define('car', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, allowNull: false},
	engine: {type: DataTypes.STRING},
	transmission: {type: DataTypes.STRING},
	passengers: {type: DataTypes.INTEGER},
	bags: {type: DataTypes.INTEGER},
	doors: {type: DataTypes.INTEGER},
	info: {type: DataTypes.TEXT}
})

const carprops = sequelize.define('car_props', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	key: {type: DataTypes.STRING, allowNull: false, unique: true},
	fullName: {type: DataTypes.STRING, allowNull: false}
})

const reservation = sequelize.define('reservation', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	dateFrom: {type: DataTypes.STRING, allowNull: false},
	dateTill: {type: DataTypes.STRING, allowNull: false},
	time: {type: DataTypes.STRING, allowNull: false},
	place: {type: DataTypes.STRING, allowNull: false},
	price: {type: DataTypes.FLOAT(2), allowNull: false}
})

const feedback = sequelize.define('feedback', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	img: {type: DataTypes.STRING},
	rating: {type: DataTypes.INTEGER, defaultValue: 5},
	text: {type: DataTypes.TEXT, allowNull: false},
	author: {type: DataTypes.STRING, allowNull: false}
})

const currency = sequelize.define('currency', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, allowNull: false, unique: true},
	rate: {type: DataTypes.FLOAT, allowNull: false}
})

const language = sequelize.define('language', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	locale: {type: DataTypes.STRING, allowNull: false, unique: true}
})

user.hasMany(reservation)
reservation.belongsTo(user)

reservation.hasOne(car)
car.belongsTo(reservation)

export default {
	user,
	car,
	carprops,
	reservation,
	feedback,
	currency,
	language,
}