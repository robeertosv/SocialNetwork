import express from 'express'

import { upload, checkUsername, getUserProfile, getUID, getUsernameByToken, requestFollow, cancelFollow, getFollowers, getFollows, updateProfile } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/checkUsername', checkUsername)
router.post('/getUserProfile', getUserProfile)
router.post('/getUserByToken', getUsernameByToken)
router.post('/UID', getUID)
router.post('/requestFollow', requestFollow)
router.post('/unfollow', cancelFollow)
router.post('/getUserFollowers', getFollowers)
router.post('/getUserFollows', getFollows)
router.post('/updateProfile', upload.single('pic'), updateProfile)

export default router