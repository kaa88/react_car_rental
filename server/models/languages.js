import { DataTypes } from 'sequelize'
import sequelize from '../db.js'

export const language = sequelize.define('language', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	locale: {type: DataTypes.STRING, allowNull: false}
})

export const lang_en = sequelize.define('lang_en', {
		id: {type: DataTypes.INTEGER, primaryKey: true},
		text: {type: DataTypes.STRING, allowNull: false}
	},
	{freezeTableName: true}
)

export const lang_ru = sequelize.define('lang_ru', {
		id: {type: DataTypes.INTEGER, primaryKey: true},
		text: {type: DataTypes.STRING, allowNull: false}
	},
	{freezeTableName: true}
)

export const lang_de = sequelize.define('lang_de', {
		id: {type: DataTypes.INTEGER, primaryKey: true},
		text: {type: DataTypes.STRING, allowNull: false}
	},
	{freezeTableName: true}
)

export default {
	language,
	lang_en,
	lang_ru,
	lang_de
}