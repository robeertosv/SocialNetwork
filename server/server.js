import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import path from 'path'

import connectDB from './db/connectDB.js'
import authRouter from './routes/auth.routes.js'
import postRouter from './routes/post.routes.js'
import userRouter from './routes/user.routes.js'
import fileRouter from './routes/files.routes.js'
import cookieParser from 'cookie-parser'

configDotenv()

const port = process.env.PORT || 80
const __dirname = path.resolve()
const app = express()

const corsConfig = {
    origin: 'http://localhost:9000',
    credentials: true
}

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsConfig))
app.use(express.static(path.join(__dirname, '../frontend', 'dist')))

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/users', userRouter)
app.use('/images', fileRouter)

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/dist/index.html')))


app.listen(port, () => {
    connectDB()
    console.log('http://localhost')
})