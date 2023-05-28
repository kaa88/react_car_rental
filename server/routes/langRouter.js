import express from 'express'
import LangController from '../controllers/langController.js'

const router = express.Router()

router.get('/', LangController.get)
router.post('/', LangController.add)
router.delete('/', LangController.delete)

export default router