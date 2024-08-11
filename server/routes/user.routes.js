import express from 'express'

import { checkUsername, getUserProfile, getUID} from '../controllers/user.controller.js'

const router = express.Router()

router.post('/checkUsername', checkUsername)
router.post('/getUserProfile', getUserProfile)
router.post('/UID', getUID)

export default router