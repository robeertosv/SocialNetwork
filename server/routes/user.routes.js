import express from 'express'

import { checkUsername, getUserProfile} from '../controllers/user.controller.js'

const router = express.Router()

router.post('/checkUsername', checkUsername)
router.post('/getUserProfile', getUserProfile)

export default router