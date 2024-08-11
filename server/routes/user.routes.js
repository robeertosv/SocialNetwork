import express from 'express'

import { checkUsername } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/checkUsername', checkUsername)

export default router