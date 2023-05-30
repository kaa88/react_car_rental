import express from 'express'
import langController from '../controllers/langController.js'

const router = express.Router()

router.post('/add', langController.add)
router.post('/edit', langController.edit)
router.delete('/delete', langController.delete)
router.post('/', langController.get)

export default router