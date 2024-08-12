import express from 'express'

import { checkUsername, getUserProfile, getUID, getUsernameByToken} from '../controllers/user.controller.js'

const router = express.Router()

router.post('/checkUsername', checkUsername)
router.post('/getUserProfile', getUserProfile)
router.post('/getUserByToken', getUsernameByToken)
router.post('/UID', getUID)

export default router