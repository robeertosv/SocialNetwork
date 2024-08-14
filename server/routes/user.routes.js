import express from 'express'

import { upload, getNotifications, acceptFollow, checkUsername, getUserProfile, getUID, getUsernameByToken, requestFollow, cancelFollow, getFollowers, getFollows, updateProfile } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/checkUsername', checkUsername)
router.post('/getUserProfile', getUserProfile)
router.post('/getUserByToken', getUsernameByToken)
router.post('/UID', getUID)
router.post('/requestFollow', requestFollow)
router.post('/acceptFollow', acceptFollow)
router.post('/unfollow', cancelFollow)
router.post('/getUserFollowers', getFollowers)
router.post('/getUserFollows', getFollows)
router.post('/updateProfile', upload.single('pic'), updateProfile)
router.post('/getNotifications', getNotifications)

export default router