import 'dotenv/config'
import express from 'express'
import sequelize from './db.js'
// import cors from 'cors'
import router from './routes/index.js'
import models from './models/models.js'
import errorHandler from './middleware/errorHandler.js'


const PORT = process.env.SERVER_PORT || 5000

const app = express()
app.use(express.json())
// app.use(cors())
app.use('/api', router)

// app.use(errorHandler)

async function start() {
	try {
		app.listen(PORT, () => {
			console.log(`Server has been started on port ${PORT}...`)
		})
		await sequelize.authenticate()
			.then(console.log('MySQL authentication is OK'))
		await sequelize.sync()
	} catch (err) {
		console.log(err)
	}
}
start()