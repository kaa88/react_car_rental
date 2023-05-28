import express from 'express'
import FeedbackController from '../controllers/feedbackController.js'

const router = express.Router()

router.get('/', FeedbackController.get)
router.post('/add', FeedbackController.add)
router.post('/edit', FeedbackController.edit)
router.delete('/delete', FeedbackController.delete)

export default router