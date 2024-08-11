import express from 'express'
import path from 'path'

const __dirname = path.resolve()
const router = express.Router()

router.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname, 'uploads'+req.url))
})

export default router;