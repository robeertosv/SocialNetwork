import express from 'express'

import { checkUsername, getUserProfile, getUID, getUsernameByToken, requestFollow, cancelFollow} from '../controllers/user.controller.js'

const router = express.Router()

router.post('/checkUsername', checkUsername)
router.post('/getUserProfile', getUserProfile)
router.post('/getUserByToken', getUsernameByToken)
router.post('/UID', getUID)
router.post('/requestFollow', requestFollow)
router.post('/unfollow', cancelFollow)

export default router