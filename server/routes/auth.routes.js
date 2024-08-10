import express from 'express'
import { createAccount, login, deleteAccount, checkLogin } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', createAccount)
router.post('/login', login)
router.delete('/delete', deleteAccount)
router.post('/checkLogin', checkLogin)

export default router